// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AuthorizationSource, authorizationSourceSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface Role {
  id?: string;
  name?: string;
  source?: AuthorizationSource;
}
export interface RoleDetails {
  role?: Role;
  userId?: string;
  workspaceId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const roleSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  source: z.lazy(() => authorizationSourceSchema).optional(),
});
export const roleDetailsSchema = z.object({
  role: roleSchema.optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
