// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AutomaticTimeEntryCreation, DatePeriod, automaticTimeEntryCreationSchema, datePeriodSchema } from "./common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface HolidayDto {
  automaticTimeEntryCreation?: AutomaticTimeEntryCreation;
  color?: string;
  datePeriod?: DatePeriod;
  everyoneIncludingNew?: boolean;
  id?: string;
  name?: string;
  occursAnnually?: boolean;
  userGroupIds?: string[];
  userIds?: string[];
  workspaceId?: string;
}
export interface HolidayDtoV1 {
  automaticTimeEntryCreation?: boolean;
  datePeriod?: DatePeriod;
  everyoneIncludingNew?: boolean;
  id?: string;
  name?: string;
  occursAnnually?: boolean;
  projectId?: string;
  taskId?: string;
  userGroupIds?: string[];
  userIds?: string[];
  workspaceId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const holidayDtoSchema = z.object({
  automaticTimeEntryCreation: z.lazy(() => automaticTimeEntryCreationSchema).optional(),
  color: z.string().optional(),
  datePeriod: z.lazy(() => datePeriodSchema).optional(),
  everyoneIncludingNew: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  occursAnnually: z.boolean().optional(),
  userGroupIds: z.array(z.string()).optional(),
  userIds: z.array(z.string()).optional(),
  workspaceId: z.string().optional(),
});
export const holidayDtoV1Schema = z.object({
  automaticTimeEntryCreation: z.boolean().optional(),
  datePeriod: z.lazy(() => datePeriodSchema).optional(),
  everyoneIncludingNew: z.boolean().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  occursAnnually: z.boolean().optional(),
  projectId: z.string().optional(),
  taskId: z.string().optional(),
  userGroupIds: z.array(z.string()).optional(),
  userIds: z.array(z.string()).optional(),
  workspaceId: z.string().optional(),
});
