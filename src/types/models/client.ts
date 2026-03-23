// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface Client {
  address?: string;
  archived?: boolean;
  ccEmails?: string[];
  currencyId?: string;
  email?: string;
  id?: string;
  name?: string;
  note?: string;
  workspaceId?: string;
}
export interface ClientWithCurrency {
  address?: string;
  archived?: boolean;
  ccEmails?: string[];
  currencyCode?: string;
  currencyId?: string;
  email?: string;
  id?: string;
  name?: string;
  note?: string;
  workspaceId?: string;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const clientSchema = z.object({
  address: z.string().optional(),
  archived: z.boolean().optional(),
  ccEmails: z.array(z.string()).optional(),
  currencyId: z.string().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  note: z.string().optional(),
  workspaceId: z.string().optional(),
});
export const clientWithCurrencySchema = z.object({
  address: z.string().optional(),
  archived: z.boolean().optional(),
  ccEmails: z.array(z.string()).optional(),
  currencyCode: z.string().optional(),
  currencyId: z.string().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  note: z.string().optional(),
  workspaceId: z.string().optional(),
});
