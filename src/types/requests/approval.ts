// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { DateRange, dateRangeSchema } from "../models/common.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface ApprovalRequestCreator {
  userEmail?: string;
  userId?: string;
  userName?: string;
}
export interface ApprovalRequestOwner {
  startOfWeek?: "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY";
  timeZone?: string;
  userId?: string;
  userName?: string;
}
export interface ApprovalRequestStatus {
  note?: string;
  state?: "PENDING" | "APPROVED" | "WITHDRAWN_SUBMISSION" | "WITHDRAWN_APPROVAL" | "REJECTED";
  updatedAt?: string;
  updatedBy?: string;
  updatedByUserName?: string;
}
export interface ApprovalRequest {
  creator?: ApprovalRequestCreator;
  dateRange?: DateRange;
  id?: string;
  owner?: ApprovalRequestOwner;
  status?: ApprovalRequestStatus;
  workspaceId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const approvalRequestCreatorSchema = z.object({
  userEmail: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
});
export const approvalRequestOwnerSchema = z.object({
  startOfWeek: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]).optional(),
  timeZone: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
});
export const approvalRequestStatusSchema = z.object({
  note: z.string().optional(),
  state: z.enum(["PENDING", "APPROVED", "WITHDRAWN_SUBMISSION", "WITHDRAWN_APPROVAL", "REJECTED"]).optional(),
  updatedAt: z.string().datetime({ offset: true }).optional(),
  updatedBy: z.string().optional(),
  updatedByUserName: z.string().optional(),
});
export const approvalRequestSchema = z.object({
  creator: approvalRequestCreatorSchema.optional(),
  dateRange: z.lazy(() => dateRangeSchema).optional(),
  id: z.string().optional(),
  owner: approvalRequestOwnerSchema.optional(),
  status: approvalRequestStatusSchema.optional(),
  workspaceId: z.string().optional(),
});
