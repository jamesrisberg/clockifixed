// Auto-generated from openapi.json — do not edit by hand
// Run: npx tsx scripts/generate-types.ts

import { z } from "zod";
import { AutomaticLock, CurrencyWithDefaultInfo, Feature, FeatureSubscriptionType, HourlyRate, Round, automaticLockSchema, currencyWithDefaultInfoSchema, featureSchema, featureSubscriptionTypeSchema, hourlyRateSchema, roundSchema } from "./common.js";
import { EntityCreationPermissions, entityCreationPermissionsSchema } from "./entity.js";
import { Membership, membershipSchema } from "./member.js";
import { RateDtoV1, rateDtoV1Schema } from "./rate.js";

// ── TypeScript Interfaces ─────────────────────────────────────────

export interface WorkspaceSubdomain {
  enabled?: boolean;
  name?: string;
}
export interface WorkspaceSettings {
  activeBillableHours?: boolean;
  adminOnlyPages?: "PROJECT" | "TEAM" | "REPORTS";
  automaticLock?: AutomaticLock;
  canSeeTimeSheet?: boolean;
  canSeeTracker?: boolean;
  currencyFormat?: "CURRENCY_SPACE_VALUE" | "VALUE_SPACE_CURRENCY" | "CURRENCY_VALUE" | "VALUE_CURRENCY";
  defaultBillableProjects?: boolean;
  durationFormat?: "FULL" | "COMPACT" | "DECIMAL";
  entityCreationPermissions?: EntityCreationPermissions;
  forceDescription?: boolean;
  forceProjects?: boolean;
  forceTags?: boolean;
  forceTasks?: boolean;
  isProjectPublicByDefault?: boolean;
  lockTimeEntries?: string;
  lockTimeZone?: string;
  multiFactorEnabled?: boolean;
  numberFormat?: "COMMA_PERIOD" | "PERIOD_COMMA" | "QUOTATION_MARK_PERIOD" | "SPACE_COMMA";
  onlyAdminsCanChangeBillableStatus?: boolean;
  onlyAdminsCreateProject?: boolean;
  onlyAdminsCreateTag?: boolean;
  onlyAdminsCreateTask?: boolean;
  onlyAdminsSeeAllTimeEntries?: boolean;
  onlyAdminsSeeBillableRates?: boolean;
  onlyAdminsSeeDashboard?: boolean;
  onlyAdminsSeePublicProjectsEntries?: boolean;
  projectFavorites?: boolean;
  projectGroupingLabel?: string;
  projectLabel?: string;
  projectPickerSpecialFilter?: boolean;
  round?: Round;
  taskLabel?: string;
  timeRoundingInReports?: boolean;
  timeTrackingMode?: "DEFAULT" | "STOPWATCH_ONLY";
  trackTimeDownToSecond?: boolean;
  workingDays?: ("MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" | "SUNDAY")[];
}
export interface Workspace {
  cakeOrganizationId?: string;
  costRate?: RateDtoV1;
  currencies?: CurrencyWithDefaultInfo[];
  featureSubscriptionType?: FeatureSubscriptionType;
  features?: Feature;
  hourlyRate?: HourlyRate;
  id?: string;
  imageUrl?: string;
  memberships?: Membership[];
  name?: string;
  subdomain?: WorkspaceSubdomain;
  workspaceSettings?: WorkspaceSettings;
}

// ── Zod Schemas ──────────────────────────────────────────────────

export const workspaceSubdomainSchema = z.object({
  enabled: z.boolean().optional(),
  name: z.string().optional(),
});
export const workspaceSettingsSchema = z.object({
  activeBillableHours: z.boolean().optional(),
  adminOnlyPages: z.enum(["PROJECT", "TEAM", "REPORTS"]).optional(),
  automaticLock: z.lazy(() => automaticLockSchema).optional(),
  canSeeTimeSheet: z.boolean().optional(),
  canSeeTracker: z.boolean().optional(),
  currencyFormat: z.enum(["CURRENCY_SPACE_VALUE", "VALUE_SPACE_CURRENCY", "CURRENCY_VALUE", "VALUE_CURRENCY"]).optional(),
  defaultBillableProjects: z.boolean().optional(),
  durationFormat: z.enum(["FULL", "COMPACT", "DECIMAL"]).optional(),
  entityCreationPermissions: z.lazy(() => entityCreationPermissionsSchema).optional(),
  forceDescription: z.boolean().optional(),
  forceProjects: z.boolean().optional(),
  forceTags: z.boolean().optional(),
  forceTasks: z.boolean().optional(),
  isProjectPublicByDefault: z.boolean().optional(),
  lockTimeEntries: z.string().optional(),
  lockTimeZone: z.string().optional(),
  multiFactorEnabled: z.boolean().optional(),
  numberFormat: z.enum(["COMMA_PERIOD", "PERIOD_COMMA", "QUOTATION_MARK_PERIOD", "SPACE_COMMA"]).optional(),
  onlyAdminsCanChangeBillableStatus: z.boolean().optional(),
  onlyAdminsCreateProject: z.boolean().optional(),
  onlyAdminsCreateTag: z.boolean().optional(),
  onlyAdminsCreateTask: z.boolean().optional(),
  onlyAdminsSeeAllTimeEntries: z.boolean().optional(),
  onlyAdminsSeeBillableRates: z.boolean().optional(),
  onlyAdminsSeeDashboard: z.boolean().optional(),
  onlyAdminsSeePublicProjectsEntries: z.boolean().optional(),
  projectFavorites: z.boolean().optional(),
  projectGroupingLabel: z.string().optional(),
  projectLabel: z.string().optional(),
  projectPickerSpecialFilter: z.boolean().optional(),
  round: z.lazy(() => roundSchema).optional(),
  taskLabel: z.string().optional(),
  timeRoundingInReports: z.boolean().optional(),
  timeTrackingMode: z.enum(["DEFAULT", "STOPWATCH_ONLY"]).optional(),
  trackTimeDownToSecond: z.boolean().optional(),
  workingDays: z.array(z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"])).optional(),
});
export const workspaceSchema = z.object({
  cakeOrganizationId: z.string().optional(),
  costRate: z.lazy(() => rateDtoV1Schema).optional(),
  currencies: z.array(z.lazy(() => currencyWithDefaultInfoSchema)).optional(),
  featureSubscriptionType: z.lazy(() => featureSubscriptionTypeSchema).optional(),
  features: z.lazy(() => featureSchema).optional(),
  hourlyRate: z.lazy(() => hourlyRateSchema).optional(),
  id: z.string().optional(),
  imageUrl: z.string().optional(),
  memberships: z.array(z.lazy(() => membershipSchema)).optional(),
  name: z.string().optional(),
  subdomain: workspaceSubdomainSchema.optional(),
  workspaceSettings: workspaceSettingsSchema.optional(),
});
