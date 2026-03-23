/**
 * Write test runner — setup, teardown, and orphan sweep.
 */

import { Clockify } from "../../client/clockify.js";
import { HttpClient } from "../../client/http.js";
import { Reporter } from "../reporter.js";
import { TestContext, CleanupRegistry } from "./context.js";
import { PREFIX_PATTERN } from "./fixtures.js";
import { withRetry } from "./helpers.js";

export class WriteTestRunner {
  readonly api: Clockify;
  readonly ctx: TestContext;
  readonly cleanup: CleanupRegistry;
  readonly reporter: Reporter;
  private http: HttpClient;

  constructor(config: { apiKey: string; workspaceId: string }) {
    this.api = new Clockify({
      apiKey: config.apiKey,
      workspaceId: config.workspaceId,
      maxRequestsPerSecond: 8,
    });
    this.http = new HttpClient({
      apiKey: config.apiKey,
      maxRequestsPerSecond: 8,
    });
    this.ctx = { workspaceId: config.workspaceId, userId: "" };
    this.cleanup = new CleanupRegistry();
    this.reporter = new Reporter();
  }

  /** Discover user ID and sweep orphan test data */
  async setup(): Promise<void> {
    // Discover logged-in user
    const user = await this.api.users.getLoggedUser();
    this.ctx.userId = user.id!;
    console.log(`  User: ${user.name} (${this.ctx.userId})`);

    // Sweep orphans from prior runs
    const swept = await this.sweepOrphans();
    if (swept > 0) {
      console.log(`  Swept ${swept} orphan entities from prior runs`);
    }
  }

  /** Run cleanup registry and write report */
  async teardown(): Promise<void> {
    console.log(`\n  Running cleanup (${this.cleanup.size} entries)...`);
    const result = await this.cleanup.runAll();

    if (result.failed.length > 0) {
      console.log(`  Cleanup: ${result.succeeded.length} ok, ${result.failed.length} failed`);
      for (const f of result.failed) {
        console.log(`    FAIL: ${f.label} — ${f.error}`);
      }
    } else {
      console.log(`  Cleanup: ${result.succeeded.length} entities cleaned up`);
    }

    // Write report
    const { writeFileSync } = await import("fs");
    const { join } = await import("path");
    const reportPath = join(import.meta.dirname, "..", "write-report.json");
    const report = this.reporter.buildReport(this.ctx.workspaceId);
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`  Write report: ${reportPath}`);

    // Print summary
    this.reporter.printSummary(this.ctx.workspaceId);
  }

  /** Find and delete entities matching the test prefix */
  async sweepOrphans(): Promise<number> {
    let count = 0;

    try {
      // Time entries (search by description)
      const entries = await withRetry(() =>
        this.api.timeEntries.getForUser(this.ctx.userId, { description: PREFIX_PATTERN })
      );
      for (const te of entries) {
        if (te.description?.includes(PREFIX_PATTERN)) {
          try { await this.api.timeEntries.delete(te.id!); count++; } catch {}
        }
      }

      // Tasks on projects (need to find projects first)
      const projects = await withRetry(() => this.api.projects.getAll({ name: PREFIX_PATTERN }));
      for (const p of projects) {
        try {
          const tasks = await this.api.tasks.getAll(p.id!);
          for (const t of tasks) {
            if (t.name?.includes(PREFIX_PATTERN)) {
              try { await this.api.tasks.delete(p.id!, t.id!); count++; } catch {}
            }
          }
        } catch {}
        try {
          await this.api.projects.update(p.id!, { name: p.name!, archived: true });
          await this.api.projects.delete(p.id!);
          count++;
        } catch {}
      }

      // Clients (must archive before delete)
      const clients = await withRetry(() => this.api.clients.getAll());
      for (const c of clients) {
        if (c.name?.includes(PREFIX_PATTERN)) {
          try {
            await this.api.clients.update(c.id!, { name: c.name!, archived: true });
            await this.api.clients.delete(c.id!);
            count++;
          } catch {}
        }
      }

      // Tags
      const tags = await withRetry(() => this.api.tags.getAll());
      for (const t of tags) {
        if (t.name?.includes(PREFIX_PATTERN)) {
          try { await this.api.tags.delete(t.id!); count++; } catch {}
        }
      }

      // Groups
      const groups = await withRetry(() => this.api.groups.getAll());
      for (const g of groups) {
        if (g.name?.includes(PREFIX_PATTERN)) {
          try { await this.api.groups.delete(g.id!); count++; } catch {}
        }
      }

      // Holidays
      const holidays = await withRetry(() => this.api.holidays.getAll());
      for (const h of holidays) {
        if (h.name?.includes(PREFIX_PATTERN)) {
          try { await this.api.holidays.delete(h.id!); count++; } catch {}
        }
      }

      // Webhooks
      try {
        const wh = await withRetry(() => this.api.webhooks.getAll());
        const webhooks = (wh as any)?.webhooks ?? [];
        for (const w of webhooks) {
          if (w.name?.includes(PREFIX_PATTERN)) {
            try { await this.api.webhooks.delete(w.id!); count++; } catch {}
          }
        }
      } catch {}

      // Custom fields
      try {
        const cfs = await withRetry(() => this.api.customFields.getAll());
        for (const cf of cfs) {
          if (cf.name?.includes(PREFIX_PATTERN)) {
            try { await this.api.customFields.delete(cf.id!); count++; } catch {}
          }
        }
      } catch {}

      // Policies
      try {
        const policies = await withRetry(() => this.api.policies.getAll());
        for (const p of policies) {
          if (p.name?.includes(PREFIX_PATTERN)) {
            try { await this.api.policies.delete(p.id!); count++; } catch {}
          }
        }
      } catch {}

    } catch (err: any) {
      console.log(`  Orphan sweep partial failure: ${err.message}`);
    }

    return count;
  }
}
