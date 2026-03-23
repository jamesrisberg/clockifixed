/**
 * Verification runner — orchestrates endpoint checks against the live API.
 */

import { HttpClient } from "../client/http.js";
import type { EndpointCheck } from "./checks.js";
import { checkSchema, checkArraySchema } from "./schema-checker.js";
import { Reporter, type CheckReport } from "./reporter.js";

export interface RunnerConfig {
  apiKey: string;
  workspaceId: string;
  baseUrl?: string;
  /** Only run checks matching these tags */
  tags?: string[];
  /** Only run checks matching this name pattern */
  nameFilter?: string;
}

export class VerificationRunner {
  private http: HttpClient;
  private config: RunnerConfig;
  private reporter: Reporter;
  /** Cache of IDs discovered during list checks, keyed by check name */
  private discoveredIds = new Map<string, string>();
  /** Cache of any extra context (e.g., userId from "Get logged user") */
  private context = new Map<string, string>();

  constructor(config: RunnerConfig) {
    this.config = config;
    this.http = new HttpClient({
      apiKey: config.apiKey,
      baseUrl: config.baseUrl,
      maxRequestsPerSecond: 5, // Conservative for verification
    });
    this.reporter = new Reporter();
  }

  /**
   * Resolve path template placeholders.
   */
  private resolvePath(check: EndpointCheck): string | null {
    let path = check.path;

    // Replace {workspaceId}
    path = path.replace("{workspaceId}", this.config.workspaceId);

    // Replace {userId} with logged user ID
    if (path.includes("{userId}")) {
      const userId = this.context.get("userId");
      if (!userId) return null;
      path = path.replace("{userId}", userId);
    }

    // Replace {id}, {projectId}, {taskId}, etc. from discovered IDs
    const idPlaceholders = path.match(/\{(\w+)\}/g);
    if (idPlaceholders) {
      for (const placeholder of idPlaceholders) {
        if (check.requiresIdFrom) {
          const id = this.discoveredIds.get(check.requiresIdFrom);
          if (!id) return null;
          path = path.replace(placeholder, id);
        } else {
          return null; // Can't resolve
        }
      }
    }

    return path;
  }

  /**
   * Run a single endpoint check.
   */
  async runCheck(check: EndpointCheck): Promise<CheckReport> {
    const start = Date.now();

    // Skip if flagged
    if (check.skip) {
      return {
        check,
        status: "skip",
        durationMs: 0,
        error: check.skipReason,
      };
    }

    // Resolve path
    const path = this.resolvePath(check);
    if (path === null) {
      return {
        check,
        status: "skip",
        durationMs: Date.now() - start,
        error: `Could not resolve path — missing ID from "${check.requiresIdFrom}"`,
      };
    }

    try {
      let data: unknown;

      if (check.method === "GET") {
        data = await this.http.get(path, { params: check.params });
      } else if (check.method === "POST") {
        data = await this.http.post(path, { body: check.body });
      } else {
        return {
          check,
          status: "skip",
          durationMs: Date.now() - start,
          error: `${check.method} checks not supported in read-only mode`,
        };
      }

      // Store discovered IDs for dependent checks
      if (check.array && Array.isArray(data) && data.length > 0) {
        const firstItem = data[0] as any;
        if (firstItem?.id) {
          this.discoveredIds.set(check.name, firstItem.id);
        }
      } else if (!check.array && data && typeof data === "object") {
        const item = data as any;
        if (item?.id) {
          this.discoveredIds.set(check.name, item.id);

          // Special context extraction
          if (check.name === "Get logged user") {
            this.context.set("userId", item.id);
          }
        }
      }

      // Run spec schema validation
      const result = check.array && Array.isArray(data)
        ? checkArraySchema(data, check.schema)
        : checkSchema(data, check.schema);

      // Run reality schema validation (if we have overrides)
      let realityResult: typeof result | undefined;
      let realityStatus: "pass" | "fail" | undefined;
      if (check.realitySchema) {
        realityResult = check.array && Array.isArray(data)
          ? checkArraySchema(data, check.realitySchema)
          : checkSchema(data, check.realitySchema);
        realityStatus = realityResult.valid ? "pass" : "fail";
      }

      const durationMs = Date.now() - start;

      const report: CheckReport = {
        check,
        status: result.valid ? "pass" : "fail",
        result,
        realityResult,
        realityStatus,
        durationMs,
      };

      // Include a sample of the response data for failed checks
      if (!result.valid) {
        if (check.array && Array.isArray(data)) {
          report.responseDataSample = data.slice(0, 1);
        } else {
          report.responseDataSample = data;
        }
      }

      return report;
    } catch (error) {
      // Treat 403 as a skip — the endpoint exists but the API key lacks permission
      const is403 = error instanceof Error && error.message.includes("403");
      return {
        check,
        status: is403 ? "skip" : "error",
        durationMs: Date.now() - start,
        error: is403
          ? `Skipped — requires elevated permissions (${check.tag})`
          : error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Run all provided checks in sequence (respecting dependencies).
   */
  async runAll(checks: EndpointCheck[]): Promise<Reporter> {
    // Filter by tag if specified
    let filtered = checks;
    if (this.config.tags?.length) {
      filtered = filtered.filter((c) =>
        this.config.tags!.some((t) => c.tag.toLowerCase().includes(t.toLowerCase()))
      );
    }
    if (this.config.nameFilter) {
      const pattern = this.config.nameFilter.toLowerCase();
      filtered = filtered.filter((c) => c.name.toLowerCase().includes(pattern));
    }

    // Run "Get logged user" first to populate userId context
    const loggedUserCheck = filtered.find((c) => c.name === "Get logged user");
    if (loggedUserCheck) {
      const report = await this.runCheck(loggedUserCheck);
      this.reporter.addResult(report);
    }

    // Run remaining checks
    for (const check of filtered) {
      if (check.name === "Get logged user") continue; // Already ran
      const report = await this.runCheck(check);
      this.reporter.addResult(report);
    }

    return this.reporter;
  }
}
