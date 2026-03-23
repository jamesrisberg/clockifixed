/**
 * Deep schema checking — validates API responses against Zod schemas
 * and detects undocumented fields.
 */

import { z } from "zod";

export interface FieldDivergence {
  path: string;
  issue: "wrong_type" | "missing_required" | "invalid_enum" | "unexpected_value" | "bad_format";
  expected: string;
  actual: string;
  value?: unknown;
}

export interface UndocumentedField {
  path: string;
  actualType: string;
  sampleValue: unknown;
}

export interface SchemaCheckResult {
  valid: boolean;
  divergences: FieldDivergence[];
  undocumentedFields: UndocumentedField[];
  zodErrors: z.ZodIssue[];
}

/**
 * Get the Zod def from a schema (handles both Zod 3 and Zod 4 internals).
 */
function getZodDef(schema: any): any {
  return schema?._zod?.def ?? schema?._def ?? null;
}

/**
 * Unwrap wrapper schemas (lazy, optional, nullable).
 */
function unwrapSchema(schema: any): any {
  const def = getZodDef(schema);
  if (!def) return schema;

  // Zod 4 lazy
  if (def.type === "lazy" || def.typeName === "ZodLazy") {
    const getter = def.getter ?? def.innerType;
    return typeof getter === "function" ? unwrapSchema(getter()) : schema;
  }
  // Zod 4 optional
  if (def.type === "optional" || def.typeName === "ZodOptional") {
    return unwrapSchema(def.innerType);
  }
  // Zod 4 nullable
  if (def.type === "nullable" || def.typeName === "ZodNullable") {
    return unwrapSchema(def.innerType);
  }

  return schema;
}

/**
 * Extract the shape (field name -> sub-schema) from an object schema.
 */
function getSchemaShape(schema: any): Record<string, any> | null {
  const unwrapped = unwrapSchema(schema);
  const def = getZodDef(unwrapped);
  if (!def) return null;

  // Zod 4: shape is directly on def or on schema
  if (def.shape && typeof def.shape === "object") return def.shape;
  if (typeof def.shape === "function") return def.shape();
  if (unwrapped.shape && typeof unwrapped.shape === "object") return unwrapped.shape;

  return null;
}

/**
 * Extract the expected keys from a Zod schema (only works for z.object).
 * Returns null if the schema isn't an object type.
 */
function getSchemaKeys(schema: z.ZodType): Set<string> | null {
  const shape = getSchemaShape(schema);
  if (!shape) return null;
  return new Set(Object.keys(shape));
}

/**
 * Recursively find undocumented fields by comparing response data
 * against the Zod schema's expected shape.
 */
function findUndocumentedFields(
  data: unknown,
  schema: z.ZodType,
  path: string = ""
): UndocumentedField[] {
  if (data === null || data === undefined || typeof data !== "object") {
    return [];
  }

  if (Array.isArray(data)) {
    // For arrays, check the first item against the array's element schema
    if (data.length === 0) return [];

    const def = getZodDef(unwrapSchema(schema));
    const itemSchema = def?.type ?? def?.element ?? null;

    if (itemSchema) {
      return findUndocumentedFields(data[0], itemSchema, `${path}[0]`);
    }
    return [];
  }

  const schemaKeys = getSchemaKeys(schema);
  if (!schemaKeys) return [];

  const undocumented: UndocumentedField[] = [];
  const record = data as Record<string, unknown>;

  for (const key of Object.keys(record)) {
    const fieldPath = path ? `${path}.${key}` : key;

    if (!schemaKeys.has(key)) {
      undocumented.push({
        path: fieldPath,
        actualType: getType(record[key]),
        sampleValue: summarizeValue(record[key]),
      });
    } else {
      // Recurse into known fields to find nested undocumented fields
      const value = record[key];
      if (value !== null && value !== undefined && typeof value === "object") {
        const shape = getSchemaShape(schema);
        const fieldSchema = shape?.[key] ? unwrapSchema(shape[key]) : null;

        if (fieldSchema) {
          undocumented.push(...findUndocumentedFields(value, fieldSchema, fieldPath));
        }
      }
    }
  }

  return undocumented;
}

function getType(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";
  if (Array.isArray(value)) {
    if (value.length === 0) return "array<empty>";
    return `array<${getType(value[0])}>`;
  }
  return typeof value;
}

function summarizeValue(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") {
    return value.length > 100 ? value.slice(0, 100) + "..." : value;
  }
  if (typeof value === "object" && !Array.isArray(value)) {
    return `{${Object.keys(value as object).join(", ")}}`;
  }
  if (Array.isArray(value)) {
    return `[${value.length} items]`;
  }
  return value;
}

/**
 * Translate Zod issues into our FieldDivergence format.
 */
function zodIssuesToDivergences(issues: z.ZodIssue[]): FieldDivergence[] {
  return issues.map((issue) => {
    const path = issue.path.join(".");
    switch (issue.code) {
      case "invalid_type":
        return {
          path,
          issue: "wrong_type" as const,
          expected: issue.expected,
          actual: issue.message,
        };
      case "invalid_value":
        return {
          path,
          issue: "invalid_enum" as const,
          expected: (issue as any).values?.join(" | ") ?? "enum",
          actual: issue.message,
        };
      default:
        return {
          path,
          issue: "unexpected_value" as const,
          expected: issue.message,
          actual: "see value",
          value: undefined,
        };
    }
  });
}

/**
 * Run a full schema check on API response data.
 */
export function checkSchema(data: unknown, schema: z.ZodType): SchemaCheckResult {
  const parseResult = schema.safeParse(data);

  const zodErrors = parseResult.success ? [] : parseResult.error.issues;
  const divergences = zodIssuesToDivergences(zodErrors);

  // Find undocumented fields even if parsing succeeded
  const undocumentedFields = findUndocumentedFields(data, schema);

  return {
    valid: parseResult.success,
    divergences,
    undocumentedFields,
    zodErrors,
  };
}

/**
 * Check an array response — validates each item and aggregates.
 * Only deeply checks the first item for undocumented fields (to avoid noise).
 */
export function checkArraySchema(
  data: unknown[],
  itemSchema: z.ZodType
): SchemaCheckResult {
  if (data.length === 0) {
    return { valid: true, divergences: [], undocumentedFields: [], zodErrors: [] };
  }

  const allDivergences: FieldDivergence[] = [];
  const allZodErrors: z.ZodIssue[] = [];
  let allValid = true;

  // Validate all items with Zod
  for (let i = 0; i < Math.min(data.length, 5); i++) {
    const result = itemSchema.safeParse(data[i]);
    if (!result.success) {
      allValid = false;
      for (const issue of result.error.issues) {
        allZodErrors.push({ ...issue, path: [i, ...issue.path] });
      }
      allDivergences.push(
        ...zodIssuesToDivergences(result.error.issues).map((d) => ({
          ...d,
          path: `[${i}].${d.path}`,
        }))
      );
    }
  }

  // Undocumented fields from first item only
  const undocumentedFields = findUndocumentedFields(data[0], itemSchema, "[0]");

  return {
    valid: allValid,
    divergences: allDivergences,
    undocumentedFields,
    zodErrors: allZodErrors,
  };
}
