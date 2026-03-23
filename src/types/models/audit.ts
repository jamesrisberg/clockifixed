// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface AuditMetadata {
  createdAt?: string;
  updatedAt?: string;
}
export interface AuditLog {
  action?: "CREATE_TIME_PERSONAL_TIMER" | "CREATE_TIME_PERSONAL_MANUAL" | "CREATE_TIME_IMPORT" | "CREATE_TIME_KIOSK" | "CREATE_TIME_FOR_OTHER" | "RESTORE_TIME" | "RESTORE_TIME_FOR_OTHER" | "UPDATE_TIME_PERSONAL" | "UPDATE_TIME_FOR_OTHER" | "DELETE_TIME_PERSONAL" | "DELETE_TIME_FOR_OTHER" | "CREATE_PROJECT" | "CREATE_PROJECT_IMPORT" | "CREATE_PROJECT_QUICKBOOKS" | "UPDATE_PROJECT" | "DELETE_PROJECT" | "CREATE_TASK" | "CREATE_TASK_IMPORT" | "UPDATE_TASK" | "DELETE_TASK" | "CREATE_CLIENT" | "CREATE_CLIENT_IMPORT" | "CREATE_CLIENT_QUICKBOOKS" | "UPDATE_CLIENT" | "DELETE_CLIENT" | "CREATE_TAG" | "CREATE_TAG_IMPORT" | "UPDATE_TAG" | "DELETE_TAG" | "CREATE_EXPENSE" | "CREATE_EXPENSE_FOR_OTHER" | "RESTORE_EXPENSE" | "RESTORE_EXPENSE_FOR_OTHER" | "UPDATE_EXPENSE" | "UPDATE_EXPENSE_FOR_OTHER" | "DELETE_EXPENSE" | "DELETE_EXPENSE_FOR_OTHER";
  content?: string;
  previousContent?: string;
  timestamp?: string;
  userEmail?: string;
  userId?: string;
  userName?: string;
  workspaceId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const auditMetadataSchema = z.object({
  createdAt: z.string().datetime({ offset: true }).optional(),
  updatedAt: z.string().datetime({ offset: true }).optional(),
});
export const auditLogSchema = z.object({
  action: z.enum(["CREATE_TIME_PERSONAL_TIMER", "CREATE_TIME_PERSONAL_MANUAL", "CREATE_TIME_IMPORT", "CREATE_TIME_KIOSK", "CREATE_TIME_FOR_OTHER", "RESTORE_TIME", "RESTORE_TIME_FOR_OTHER", "UPDATE_TIME_PERSONAL", "UPDATE_TIME_FOR_OTHER", "DELETE_TIME_PERSONAL", "DELETE_TIME_FOR_OTHER", "CREATE_PROJECT", "CREATE_PROJECT_IMPORT", "CREATE_PROJECT_QUICKBOOKS", "UPDATE_PROJECT", "DELETE_PROJECT", "CREATE_TASK", "CREATE_TASK_IMPORT", "UPDATE_TASK", "DELETE_TASK", "CREATE_CLIENT", "CREATE_CLIENT_IMPORT", "CREATE_CLIENT_QUICKBOOKS", "UPDATE_CLIENT", "DELETE_CLIENT", "CREATE_TAG", "CREATE_TAG_IMPORT", "UPDATE_TAG", "DELETE_TAG", "CREATE_EXPENSE", "CREATE_EXPENSE_FOR_OTHER", "RESTORE_EXPENSE", "RESTORE_EXPENSE_FOR_OTHER", "UPDATE_EXPENSE", "UPDATE_EXPENSE_FOR_OTHER", "DELETE_EXPENSE", "DELETE_EXPENSE_FOR_OTHER"]).optional(),
  content: z.string().optional(),
  previousContent: z.string().optional(),
  timestamp: z.string().optional(),
  userEmail: z.string().optional(),
  userId: z.string().optional(),
  userName: z.string().optional(),
  workspaceId: z.string().optional(),
});
