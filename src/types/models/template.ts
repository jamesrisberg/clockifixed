// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { ProjectTaskTuple, projectTaskTupleSchema } from "./project.js";
import { TimeEntryWithCustomFields, timeEntryWithCustomFieldsSchema } from "./time-entry.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface Template {
  id?: string;
  name?: string;
  userId?: string;
  workspaceId?: string;
}
export interface TemplateDtoImpl {
  entries?: TimeEntryWithCustomFields[];
  id?: string;
  name?: string;
  projectsAndTasks?: ProjectTaskTuple[];
  userId?: string;
  weekStart?: string;
  workspaceId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const templateSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  userId: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const templateDtoImplSchema = z.object({
  entries: z.array(z.lazy(() => timeEntryWithCustomFieldsSchema)).optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  projectsAndTasks: z.array(z.lazy(() => projectTaskTupleSchema)).optional(),
  userId: z.string().optional(),
  weekStart: z.string().optional(),
  workspaceId: z.string().optional(),
});
