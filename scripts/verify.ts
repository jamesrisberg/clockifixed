#!/usr/bin/env npx tsx
/**
 * Standalone verification script.
 *
 * Usage:
 *   npx tsx scripts/verify.ts                  # uses .env, auto-discovers workspace
 *   npx tsx scripts/verify.ts --tag Project    # filter by domain
 *   CLOCKIFY_WORKSPACE_ID=xxx npx tsx scripts/verify.ts  # target specific workspace
 */

import { join } from "path";
import { readFileSync } from "fs";
import { VerificationRunner } from "../src/verify/runner.js";
import { readOnlyChecks } from "../src/verify/checks.js";
import { HttpClient } from "../src/client/http.js";

// Load .env if present
try {
  const envPath = join(import.meta.dirname, "..", ".env");
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

if (!API_KEY) {
  console.error("Missing CLOCKIFY_API_KEY. Set it in .env or as an environment variable.");
  process.exit(1);
}

// Auto-discover workspace if not provided
if (!WORKSPACE_ID) {
  console.log("No CLOCKIFY_WORKSPACE_ID set — discovering from API...");
  const http = new HttpClient({ apiKey: API_KEY });
  const workspaces = await http.get<{ id: string; name: string }[]>("/workspaces");

  if (workspaces.length === 0) {
    console.error("No workspaces found for this API key.");
    process.exit(1);
  }

  if (workspaces.length === 1) {
    WORKSPACE_ID = workspaces[0].id;
    console.log(`  Found workspace: "${workspaces[0].name}" (${WORKSPACE_ID})`);
  } else {
    console.log(`  Found ${workspaces.length} workspaces:`);
    for (const ws of workspaces) {
      console.log(`    - "${ws.name}" (${ws.id})`);
    }
    WORKSPACE_ID = workspaces[0].id;
    console.log(`  Using first: "${workspaces[0].name}"`);
    console.log(`  Set CLOCKIFY_WORKSPACE_ID to target a different one.`);
  }
  console.log("");
}

// Parse CLI args
const args = process.argv.slice(2);
const tagIndex = args.indexOf("--tag");
const tags = tagIndex >= 0 && args[tagIndex + 1] ? [args[tagIndex + 1]] : undefined;

const runner = new VerificationRunner({
  apiKey: API_KEY,
  workspaceId: WORKSPACE_ID,
  tags,
});

console.log("Starting Clockify API verification...");
console.log(`  Workspace: ${WORKSPACE_ID}`);
if (tags) console.log(`  Filtering by tags: ${tags.join(", ")}`);
console.log("");

const reporter = await runner.runAll(readOnlyChecks);

reporter.printSummary(WORKSPACE_ID);

const reportPath = join(import.meta.dirname, "..", "src", "verify", "report.json");
const report = reporter.writeJson(reportPath, WORKSPACE_ID);
console.log(`Full report written to: ${reportPath}`);

// Exit with error code if there were actual errors (not divergences)
process.exit(report.summary.errors > 0 ? 1 : 0);
