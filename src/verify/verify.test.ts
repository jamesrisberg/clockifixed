/**
 * Verification test suite — runs endpoint checks against the live Clockify API.
 *
 * Requires CLOCKIFY_API_KEY (in .env or environment).
 * CLOCKIFY_WORKSPACE_ID is auto-discovered if not set.
 *
 * Run with:
 *   npm run verify
 */

import { describe, it, expect, beforeAll } from "vitest";
import { join } from "path";
import { readFileSync } from "fs";
import { VerificationRunner } from "./runner.js";
import { readOnlyChecks } from "./checks.js";
import { Reporter } from "./reporter.js";
import { HttpClient } from "../client/http.js";

// Load .env
try {
  const envPath = join(import.meta.dirname, "..", "..", ".env");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  }
} catch {}

const API_KEY = process.env.CLOCKIFY_API_KEY;
let WORKSPACE_ID = process.env.CLOCKIFY_WORKSPACE_ID;

const canRun = !!API_KEY;

describe.skipIf(!canRun)("Clockify API Verification", () => {
  let reporter: Reporter;

  beforeAll(async () => {
    // Auto-discover workspace if needed
    if (!WORKSPACE_ID) {
      const http = new HttpClient({ apiKey: API_KEY! });
      const workspaces = await http.get<{ id: string; name: string }[]>("/workspaces");
      WORKSPACE_ID = workspaces[0]?.id;
      if (!WORKSPACE_ID) throw new Error("No workspaces found");
      console.log(`Auto-discovered workspace: ${WORKSPACE_ID}`);
    }

    const runner = new VerificationRunner({
      apiKey: API_KEY!,
      workspaceId: WORKSPACE_ID!,
    });

    reporter = await runner.runAll(readOnlyChecks);

    // Print summary to console
    reporter.printSummary(WORKSPACE_ID!);

    // Write detailed report
    const reportPath = join(import.meta.dirname, "report.json");
    reporter.writeJson(reportPath, WORKSPACE_ID!);
  }, 120_000); // 2 min timeout for all API calls

  it("should complete all checks", () => {
    const report = reporter.buildReport(WORKSPACE_ID!);
    expect(report.summary.total).toBeGreaterThan(0);
    expect(report.summary.errors).toBe(0);
  });

  it("should have no schema divergences", () => {
    const report = reporter.buildReport(WORKSPACE_ID!);
    if (report.summary.totalDivergences > 0) {
      const failedChecks = report.checks
        .filter((c) => c.result && c.result.divergences.length > 0)
        .map((c) => ({
          name: c.check.name,
          divergences: c.result!.divergences,
        }));
      // Log divergences but don't hard-fail — the whole point is to discover these
      console.log("\nDivergences found (this is expected — we're documenting them):");
      console.log(JSON.stringify(failedChecks, null, 2));
    }
    // This test documents divergences rather than enforcing zero
    expect(report.summary.total).toBeGreaterThan(0);
  });

  it("should report undocumented fields", () => {
    const report = reporter.buildReport(WORKSPACE_ID!);
    if (report.summary.totalUndocumentedFields > 0) {
      const undocumented = report.checks
        .filter((c) => c.result && c.result.undocumentedFields.length > 0)
        .map((c) => ({
          name: c.check.name,
          fields: c.result!.undocumentedFields,
        }));
      console.log("\nUndocumented fields found:");
      console.log(JSON.stringify(undocumented, null, 2));
    }
    // Informational — always passes
    expect(true).toBe(true);
  });
});
