// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface Attendance {
  break?: number;
  capacity?: number;
  date?: string;
  endTime?: string;
  hasRunningEntry?: boolean;
  imageUrl?: string;
  overtime?: number;
  remainingCapacity?: number;
  startTime?: string;
  timeOff?: number;
  totalDuration?: number;
  userId?: string;
  userName?: string;
}
export interface AttendanceReport {
  entities?: Attendance[];
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const attendanceSchema = z.object({
  break: z.number().int().optional(),
  capacity: z.number().int().optional(),
  date: z.string().optional(),
  endTime: z.string().optional(),
  hasRunningEntry: z.boolean().optional(),
  imageUrl: z.string().optional(),
  overtime: z.number().int().optional(),
  remainingCapacity: z.number().int().optional(),
  startTime: z.string().optional(),
  timeOff: z.number().int().optional(),
  totalDuration: z.number().int().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
});
export const attendanceReportSchema = z.object({
  entities: z.array(attendanceSchema).optional(),
});
