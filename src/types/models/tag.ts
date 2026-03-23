// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface TagDto {
  archived?: boolean;
  id?: string;
  name?: string;
  workspaceId?: string;
}
export interface TagDtoV1 {
  archived?: boolean;
  id?: string;
  name?: string;
  workspaceId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const tagDtoSchema = z.object({
  archived: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const tagDtoV1Schema = z.object({
  archived: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  workspaceId: z.string().optional(),
});
