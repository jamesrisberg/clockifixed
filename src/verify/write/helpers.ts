/**
 * Shared helpers for write verification tests.
 */

import { ClockifyRateLimitError } from "../../client/http.js";
import { checkSchema, checkArraySchema, type SchemaCheckResult } from "../schema-checker.js";
import { type CheckReport } from "../reporter.js";
import type { z } from "zod";

/**
 * Retry wrapper that handles rate limiting.
 */
export async function withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (err instanceof ClockifyRateLimitError && attempt < maxRetries - 1) {
        await delay(err.retryAfterMs + 100);
        continue;
      }
      throw err;
    }
  }
  throw new Error("unreachable");
}

/**
 * Small delay between operations.
 */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Validate a response against spec and reality schemas, returning a CheckReport.
 */
export function validateResponse(
  data: unknown,
  opts: {
    name: string;
    tag: string;
    method: string;
    path: string;
    specSchema: z.ZodType;
    realitySchema?: z.ZodType;
    array?: boolean;
  }
): CheckReport {
  const isArray = opts.array && Array.isArray(data);
  const result: SchemaCheckResult = isArray
    ? checkArraySchema(data, opts.specSchema)
    : checkSchema(data, opts.specSchema);

  let realityResult: SchemaCheckResult | undefined;
  let realityStatus: "pass" | "fail" | undefined;
  if (opts.realitySchema) {
    realityResult = isArray
      ? checkArraySchema(data, opts.realitySchema)
      : checkSchema(data, opts.realitySchema);
    realityStatus = realityResult.valid ? "pass" : "fail";
  }

  return {
    check: {
      name: opts.name,
      tag: opts.tag,
      method: opts.method as any,
      path: opts.path,
      schema: opts.specSchema,
      array: !!opts.array,
      readonly: false,
    },
    status: result.valid ? "pass" : "fail",
    result,
    realityResult,
    realityStatus,
    durationMs: 0,
  };
}
