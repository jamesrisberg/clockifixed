/**
 * Verification reporter — collects results and outputs structured reports.
 */

import { writeFileSync } from "fs";
import { join } from "path";
import type { SchemaCheckResult } from "./schema-checker.js";
import type { EndpointCheck } from "./checks.js";

export interface CheckReport {
  check: EndpointCheck;
  status: "pass" | "fail" | "skip" | "error";
  /** Validation against spec schema */
  result?: SchemaCheckResult;
  /** Validation against reality (patched) schema — should always pass */
  realityResult?: SchemaCheckResult;
  /** "pass" or "fail" against the reality schema */
  realityStatus?: "pass" | "fail";
  error?: string;
  responseDataSample?: unknown;
  durationMs: number;
}

export interface VerificationReport {
  timestamp: string;
  workspaceId: string;
  summary: {
    total: number;
    passed: number;
    failed: number;
    skipped: number;
    errors: number;
    totalDivergences: number;
    totalUndocumentedFields: number;
  };
  checks: CheckReport[];
  divergencesByTag: Record<string, {
    passed: number;
    failed: number;
    divergences: number;
    undocumentedFields: number;
  }>;
}

export class Reporter {
  private checks: CheckReport[] = [];

  addResult(report: CheckReport) {
    this.checks.push(report);
  }

  buildReport(workspaceId: string): VerificationReport {
    const passed = this.checks.filter((c) => c.status === "pass").length;
    const failed = this.checks.filter((c) => c.status === "fail").length;
    const skipped = this.checks.filter((c) => c.status === "skip").length;
    const errors = this.checks.filter((c) => c.status === "error").length;

    const totalDivergences = this.checks.reduce(
      (sum, c) => sum + (c.result?.divergences.length ?? 0),
      0
    );
    const totalUndocumentedFields = this.checks.reduce(
      (sum, c) => sum + (c.result?.undocumentedFields.length ?? 0),
      0
    );

    // Group by tag
    const byTag: Record<string, { passed: number; failed: number; divergences: number; undocumentedFields: number }> = {};
    for (const check of this.checks) {
      const tag = check.check.tag;
      if (!byTag[tag]) {
        byTag[tag] = { passed: 0, failed: 0, divergences: 0, undocumentedFields: 0 };
      }
      if (check.status === "pass") byTag[tag].passed++;
      if (check.status === "fail") byTag[tag].failed++;
      byTag[tag].divergences += check.result?.divergences.length ?? 0;
      byTag[tag].undocumentedFields += check.result?.undocumentedFields.length ?? 0;
    }

    return {
      timestamp: new Date().toISOString(),
      workspaceId,
      summary: {
        total: this.checks.length,
        passed,
        failed,
        skipped,
        errors,
        totalDivergences,
        totalUndocumentedFields,
      },
      checks: this.checks,
      divergencesByTag: byTag,
    };
  }

  writeJson(outputPath: string, workspaceId: string) {
    const report = this.buildReport(workspaceId);
    writeFileSync(outputPath, JSON.stringify(report, null, 2));
    return report;
  }

  printSummary(workspaceId: string) {
    const report = this.buildReport(workspaceId);
    const s = report.summary;

    console.log("\n╔══════════════════════════════════════════╗");
    console.log("║       CLOCKIFIXED VERIFICATION REPORT    ║");
    console.log("╚══════════════════════════════════════════╝\n");
    console.log(`  Timestamp:   ${report.timestamp}`);
    console.log(`  Workspace:   ${workspaceId}\n`);
    const realityChecked = this.checks.filter((c) => c.realityStatus);
    const realityPassed = realityChecked.filter((c) => c.realityStatus === "pass").length;
    const realityFailed = realityChecked.filter((c) => c.realityStatus === "fail").length;

    console.log(`  Total checks:          ${s.total}`);
    console.log(`  ── Spec schema ──`);
    console.log(`  Passed:                ${s.passed}`);
    console.log(`  Failed:                ${s.failed}`);
    console.log(`  Skipped:               ${s.skipped}`);
    console.log(`  Errors:                ${s.errors}`);
    console.log(`  Total divergences:     ${s.totalDivergences}`);
    console.log(`  Undocumented fields:   ${s.totalUndocumentedFields}`);
    if (realityChecked.length > 0) {
      console.log(`  ── Reality schema ──`);
      console.log(`  Checked:               ${realityChecked.length}`);
      console.log(`  Passed:                ${realityPassed}`);
      console.log(`  Failed:                ${realityFailed}`);
    }
    console.log("");

    // Per-tag breakdown
    console.log("  By domain:");
    for (const [tag, stats] of Object.entries(report.divergencesByTag).sort()) {
      const status = stats.failed > 0 ? "FAIL" : "PASS";
      const extra = [];
      if (stats.divergences > 0) extra.push(`${stats.divergences} divergences`);
      if (stats.undocumentedFields > 0) extra.push(`${stats.undocumentedFields} undocumented`);
      const extraStr = extra.length > 0 ? ` (${extra.join(", ")})` : "";
      console.log(`    [${status}] ${tag}: ${stats.passed}/${stats.passed + stats.failed}${extraStr}`);
    }

    // Permission-skipped checks
    const permSkipped = this.checks.filter((c) => c.status === "skip" && c.error?.includes("permissions"));
    if (permSkipped.length > 0) {
      console.log("\n  Skipped (insufficient permissions):");
      for (const check of permSkipped) {
        console.log(`    ⊘ ${check.check.name} — ${check.check.tag} (requires paid plan or admin access)`);
      }
    }

    // Detail failed checks (spec)
    const failedChecks = this.checks.filter((c) => c.status === "fail");
    if (failedChecks.length > 0) {
      console.log("\n  Spec divergences (expected — these are documented):");
      for (const check of failedChecks) {
        const realityTag = check.realityStatus === "pass" ? " ✓ reality OK" : check.realityStatus === "fail" ? " ✗ reality FAIL" : "";
        console.log(`\n    ✗ ${check.check.name}${realityTag}`);
        if (check.result) {
          for (const d of check.result.divergences.slice(0, 5)) {
            console.log(`      → ${d.path}: ${d.issue}`);
          }
          if (check.result.divergences.length > 5) {
            console.log(`      ... and ${check.result.divergences.length - 5} more`);
          }
        }
      }
    }

    // Flag any reality schema failures (these need attention)
    const realityFailures = this.checks.filter((c) => c.realityStatus === "fail");
    if (realityFailures.length > 0) {
      console.log("\n  ⚠ REALITY SCHEMA FAILURES (need override updates):");
      for (const check of realityFailures) {
        console.log(`\n    ✗ ${check.check.name}`);
        if (check.realityResult) {
          for (const d of check.realityResult.divergences.slice(0, 10)) {
            console.log(`      → ${d.path}: ${d.issue} — ${d.actual}`);
          }
        }
      }
    }

    // Undocumented fields summary
    const allUndocumented = this.checks.flatMap((c) =>
      (c.result?.undocumentedFields ?? []).map((f) => ({ ...f, check: c.check.name }))
    );
    if (allUndocumented.length > 0) {
      console.log("\n  Undocumented fields found:");
      for (const f of allUndocumented.slice(0, 20)) {
        console.log(`    ${f.check} → ${f.path}: ${f.actualType} = ${JSON.stringify(f.sampleValue)}`);
      }
      if (allUndocumented.length > 20) {
        console.log(`    ... and ${allUndocumented.length - 20} more`);
      }
    }

    console.log("");
  }
}
