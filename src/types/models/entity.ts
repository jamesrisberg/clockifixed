// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface EntityCreationPermission {
  _value: "ADMINS" | "ADMINS_AND_PROJECT_MANAGERS" | "EVERYONE";
}
export interface EntityCreationPermissions {
  whoCanCreateProjectsAndClients?: EntityCreationPermission;
  whoCanCreateTags?: EntityCreationPermission;
  whoCanCreateTasks?: EntityCreationPermission;
}
export interface EntityName {
  id?: string;
  name?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const entityCreationPermissionSchema = z.enum(["ADMINS", "ADMINS_AND_PROJECT_MANAGERS", "EVERYONE"]);
export const entityCreationPermissionsSchema = z.object({
  whoCanCreateProjectsAndClients: entityCreationPermissionSchema.optional(),
  whoCanCreateTags: entityCreationPermissionSchema.optional(),
  whoCanCreateTasks: entityCreationPermissionSchema.optional(),
});
export const entityNameSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});
