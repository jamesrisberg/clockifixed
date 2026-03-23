// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface RoleRequest {
  entityId: string;
  role: "WORKSPACE_ADMIN" | "TEAM_MANAGER" | "PROJECT_MANAGER";
  sourceType?: "USER_GROUP";
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const roleRequestSchema = z.object({
  entityId: z.string(),
  role: z.enum(["WORKSPACE_ADMIN", "TEAM_MANAGER", "PROJECT_MANAGER"]),
  sourceType: z.enum(["USER_GROUP"]).optional(),
});
