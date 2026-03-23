// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { ProjectTaskTupleRequest, projectTaskTupleRequestSchema } from "./project.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface TemplatePatchRequest {
  name: string;
}
export interface TemplateRequest {
  name: string;
  projectsAndTasks: ProjectTaskTupleRequest[];
  timeEntryIds?: string[];
  weekStart?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const templatePatchRequestSchema = z.object({
  name: z.string(),
});
export const templateRequestSchema = z.object({
  name: z.string(),
  projectsAndTasks: z.array(z.lazy(() => projectTaskTupleRequestSchema)),
  timeEntryIds: z.array(z.string()).optional(),
  weekStart: z.string().optional(),
});
