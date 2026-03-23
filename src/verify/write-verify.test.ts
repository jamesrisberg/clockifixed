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

/**
 * Container that gets populated by beforeAll and accessed by test bodies.
 * This works because describe/it register synchronously but it() callbacks
 * execute after beforeAll completes.
 */
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

  // Accessors for domain modules — safe to dereference inside it() bodies
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

  // ── Phase 5: Webhooks ───────────────────────────────────────────
  registerWebhookTests(api, ctx, cleanup, reporter);

  // ── Phase 10: Non-destructive ───────────────────────────────────
  registerWorkspaceTests(api, ctx, reporter);
  registerUserTests(api, ctx, reporter);

});
