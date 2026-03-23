/**
 * Write operation verification — tests every write endpoint against the live Clockify API.
 *
 * Requires CLOCKIFY_API_KEY (in .env or environment).
 * CLOCKIFY_WORKSPACE_ID is auto-discovered if not set.
 *
 * Run with:
 *   npm run verify:write
 */

import { describe, beforeAll, afterAll } from "vitest";
import { readFileSync } from "fs";
import { join } from "path";
import { HttpClient } from "../client/http.js";
import { WriteTestRunner } from "./write/runner.js";
import { registerClientTests } from "./write/domains/clients.js";
import { registerTagTests } from "./write/domains/tags.js";
import { registerGroupTests } from "./write/domains/groups.js";
import { registerHolidayTests } from "./write/domains/holidays.js";
import { registerCustomFieldTests } from "./write/domains/custom-fields.js";
import { registerProjectTests } from "./write/domains/projects.js";
import { registerTaskTests } from "./write/domains/tasks.js";
import { registerTimeEntryTests } from "./write/domains/time-entries.js";
import { registerWebhookTests } from "./write/domains/webhooks.js";
import { registerExpenseCategoryTests } from "./write/domains/expense-categories.js";
import { registerInvoiceTests } from "./write/domains/invoices.js";
import { registerTemplateTests } from "./write/domains/templates.js";
import { registerPolicyTests } from "./write/domains/policies.js";
import { registerSchedulingTests } from "./write/domains/scheduling.js";
import { registerApprovalTests } from "./write/domains/approvals.js";
import { registerReportTests } from "./write/domains/reports.js";
import { registerTimeOffTests } from "./write/domains/time-off.js";
import { registerSharedReportTests } from "./write/domains/shared-reports.js";
import { registerWorkspaceTests } from "./write/domains/workspace.js";
import { registerUserTests } from "./write/domains/users.js";

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

const $ = {} as { runner: WriteTestRunner };

describe.skipIf(!canRun)("Clockify Write API Verification", { timeout: 300_000 }, () => {

  beforeAll(async () => {
    if (!WORKSPACE_ID) {
      const http = new HttpClient({ apiKey: API_KEY! });
      const workspaces = await http.get<{ id: string; name: string }[]>("/workspaces");
      WORKSPACE_ID = workspaces[0]?.id;
      if (!WORKSPACE_ID) throw new Error("No workspaces found");
      console.log(`\nAuto-discovered workspace: ${WORKSPACE_ID}`);
    }

    $.runner = new WriteTestRunner({ apiKey: API_KEY!, workspaceId: WORKSPACE_ID! });
    await $.runner.setup();
  }, 60_000);

  afterAll(async () => {
    if ($.runner) await $.runner.teardown();
  }, 120_000);

  const api = () => $.runner.api;
  const ctx = () => $.runner.ctx;
  const cleanup = () => $.runner.cleanup;
  const reporter = () => $.runner.reporter;

  // ── Phase 1: Independent entities ───────────────────────────────
  registerClientTests(api, ctx, cleanup, reporter);
  registerTagTests(api, ctx, cleanup, reporter);
  registerGroupTests(api, ctx, cleanup, reporter);
  registerHolidayTests(api, ctx, cleanup, reporter);
  registerCustomFieldTests(api, ctx, cleanup, reporter);

  // ── Phase 2: Projects (depends on client) ───────────────────────
  registerProjectTests(api, ctx, cleanup, reporter);

  // ── Phase 3: Depends on project ─────────────────────────────────
  registerTaskTests(api, ctx, cleanup, reporter);
  registerTimeEntryTests(api, ctx, cleanup, reporter);
  registerTemplateTests(api, ctx, cleanup, reporter);

  // ── Phase 4: Expense categories ─────────────────────────────────
  registerExpenseCategoryTests(api, ctx, cleanup, reporter);

  // ── Phase 5: Webhooks ───────────────────────────────────────────
  registerWebhookTests(api, ctx, cleanup, reporter);

  // ── Phase 6: Invoices (needs persistent client) ─────────────────
  registerInvoiceTests(api, ctx, cleanup, reporter);

  // ── Phase 7: Policies ───────────────────────────────────────────
  registerPolicyTests(api, ctx, cleanup, reporter);

  // ── Phase 8: Time-off requests (needs policy) ──────────────────
  registerTimeOffTests(api, ctx, cleanup, reporter);

  // ── Phase 9: Scheduling, Approvals, Reports ────────────────────
  registerSchedulingTests(api, ctx, cleanup, reporter);
  registerApprovalTests(api, ctx, reporter);
  registerReportTests(api, ctx, reporter);

  // ── Phase 9b: Shared reports ─────────────────────────────────────
  registerSharedReportTests(api, ctx, cleanup, reporter);

  // ── Phase 10: Non-destructive ───────────────────────────────────
  registerWorkspaceTests(api, ctx, reporter);
  registerUserTests(api, ctx, reporter);

});
