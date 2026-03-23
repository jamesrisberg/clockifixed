/**
 * Generates TypeScript types and Zod schemas from the Clockify OpenAPI spec.
 *
 * Run with: npx tsx scripts/generate-types.ts
 *
 * Outputs into src/types/ organized by category.
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "fs";
import { join } from "path";

const ROOT = join(import.meta.dirname, "..");
const SPEC_PATH = join(ROOT, "openapi.json");
const TYPES_DIR = join(ROOT, "src", "types");

// Clean previous generated output (preserve test files)
import { readdirSync } from "fs";
function cleanGeneratedFiles(dir: string) {
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory()) {
        cleanGeneratedFiles(fullPath);
      } else if (entry.name.endsWith(".ts") && !entry.name.includes(".test.")) {
        rmSync(fullPath);
      } else if (entry.name.endsWith(".json")) {
        rmSync(fullPath);
      }
    }
  } catch {}
}
cleanGeneratedFiles(TYPES_DIR);

const spec = JSON.parse(readFileSync(SPEC_PATH, "utf-8"));
const schemas: Record<string, any> = spec.components?.schemas ?? {};

// ── Anomaly tracker ──────────────────────────────────────────────────
interface Anomaly {
  schema: string;
  field?: string;
  issue: string;
  detail: string;
}
const anomalies: Anomaly[] = [];

function trackAnomaly(schema: string, field: string | undefined, issue: string, detail: string) {
  anomalies.push({ schema, field, issue, detail });
}

// ── Build global name resolution map ─────────────────────────────────
// First pass: compute ideal names, detect collisions, assign final names
function stripSuffix(name: string): string {
  return name
    .replace(/DtoImplV1$/, "")
    .replace(/DtoV1$/, "")
    .replace(/Dto$/, "")
    .replace(/V1$/, "");
}

function toPascal(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// Map from raw OpenAPI schema name -> final TypeScript type name
const finalTypeNames = new Map<string, string>();

// Detect collisions
const idealToRaws = new Map<string, string[]>();
for (const rawName of Object.keys(schemas)) {
  const ideal = toPascal(stripSuffix(rawName));
  const list = idealToRaws.get(ideal) ?? [];
  list.push(rawName);
  idealToRaws.set(ideal, list);
}

for (const [ideal, rawNames] of idealToRaws) {
  if (rawNames.length === 1) {
    finalTypeNames.set(rawNames[0], ideal);
  } else {
    trackAnomaly(
      rawNames.join(", "),
      undefined,
      "name-collision",
      `Multiple schemas map to "${ideal}": ${rawNames.join(", ")}. Using raw names.`
    );
    for (const raw of rawNames) {
      finalTypeNames.set(raw, toPascal(raw));
    }
  }
}

function resolveTypeName(rawName: string): string {
  return finalTypeNames.get(rawName) ?? toPascal(rawName);
}

function toZodName(typeName: string): string {
  return typeName.charAt(0).toLowerCase() + typeName.slice(1) + "Schema";
}

// ── $ref resolution ──────────────────────────────────────────────────
function resolveRef(ref: string): { rawName: string; schema: any } {
  const parts = ref.replace("#/", "").split("/");
  let current: any = spec;
  for (const part of parts) {
    current = current?.[part];
  }
  return { rawName: parts[parts.length - 1], schema: current };
}

// ── Safe property key ────────────────────────────────────────────────
function safeKey(key: string): string {
  return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
}

// ── Schema → TypeScript type string ──────────────────────────────────
function schemaToTs(schema: any, parentName: string, fieldName?: string, depth = 0): string {
  if (!schema) return "unknown";

  if (schema.$ref) {
    const { rawName } = resolveRef(schema.$ref);
    return resolveTypeName(rawName);
  }

  if (schema.allOf) {
    const parts = schema.allOf.map((s: any) => schemaToTs(s, parentName, fieldName, depth));
    return parts.join(" & ");
  }

  if (schema.oneOf) {
    const parts = schema.oneOf.map((s: any) => schemaToTs(s, parentName, fieldName, depth));
    return parts.join(" | ");
  }

  if (schema.anyOf) {
    const parts = schema.anyOf.map((s: any) => schemaToTs(s, parentName, fieldName, depth));
    return parts.join(" | ");
  }

  if (schema.enum) {
    return schema.enum.map((v: any) => JSON.stringify(v)).join(" | ");
  }

  const type = schema.type;

  if (type === "array") {
    const itemType = schemaToTs(schema.items, parentName, fieldName, depth + 1);
    const needsParens = itemType.includes(" | ") || itemType.includes(" & ");
    return needsParens ? `(${itemType})[]` : `${itemType}[]`;
  }

  if (type === "object" || schema.properties) {
    if (!schema.properties && schema.additionalProperties) {
      const valType = schemaToTs(schema.additionalProperties, parentName, fieldName, depth + 1);
      return `Record<string, ${valType}>`;
    }
    if (!schema.properties) {
      return "Record<string, unknown>";
    }
    const required = new Set(schema.required ?? []);
    const indent = "  ".repeat(depth + 1);
    const lines = Object.entries(schema.properties).map(([key, prop]: [string, any]) => {
      const opt = required.has(key) ? "" : "?";
      const tsType = schemaToTs(prop as any, parentName, key, depth + 1);
      return `${indent}${safeKey(key)}${opt}: ${tsType};`;
    });
    return `{\n${lines.join("\n")}\n${"  ".repeat(depth)}}`;
  }

  if (type === "string") {
    if (schema.format === "binary") return "Blob | Buffer";
    return "string";
  }

  if (type === "integer" || type === "number") return "number";
  if (type === "boolean") return "boolean";

  if (!type) {
    trackAnomaly(parentName, fieldName, "missing-type", "Schema has no type, $ref, or composition keywords");
    return "unknown";
  }

  return "unknown";
}

// ── Schema → Zod schema string ───────────────────────────────────────
// Set during generation so schemaToZod can use z.lazy() for cross-file refs
let currentFileKey = "";
// Forward declaration — populated after entries are built
let rawNameToFileKey: Map<string, string> | undefined;

function schemaToZod(schema: any, parentName: string, fieldName?: string, depth = 0): string {
  if (!schema) return "z.unknown()";

  if (schema.$ref) {
    const { rawName } = resolveRef(schema.$ref);
    const typeName = resolveTypeName(rawName);
    const zodName = toZodName(typeName);
    // Use z.lazy() for cross-file references to avoid circular import issues
    const refFileKey = rawNameToFileKey?.get(rawName);
    if (refFileKey && refFileKey !== currentFileKey) {
      return `z.lazy(() => ${zodName})`;
    }
    return zodName;
  }

  if (schema.allOf) {
    if (schema.allOf.length === 1) {
      return schemaToZod(schema.allOf[0], parentName, fieldName, depth);
    }
    const first = schemaToZod(schema.allOf[0], parentName, fieldName, depth);
    const rest = schema.allOf.slice(1).map((s: any) => schemaToZod(s, parentName, fieldName, depth));
    return rest.reduce((acc: string, next: string) => `${acc}.and(${next})`, first);
  }

  if (schema.oneOf || schema.anyOf) {
    const items = (schema.oneOf || schema.anyOf).map((s: any) =>
      schemaToZod(s, parentName, fieldName, depth)
    );
    if (items.length === 1) return items[0];
    return `z.union([${items.join(", ")}])`;
  }

  if (schema.enum) {
    const vals = schema.enum;
    if (vals.every((v: any) => typeof v === "string")) {
      return `z.enum([${vals.map((v: string) => JSON.stringify(v)).join(", ")}])`;
    }
    return `z.union([${vals.map((v: any) => `z.literal(${JSON.stringify(v)})`).join(", ")}])`;
  }

  const type = schema.type;

  if (type === "array") {
    const itemZod = schemaToZod(schema.items, parentName, fieldName, depth + 1);
    return `z.array(${itemZod})`;
  }

  if (type === "object" || schema.properties) {
    if (!schema.properties && schema.additionalProperties) {
      const valZod = schemaToZod(schema.additionalProperties, parentName, fieldName, depth + 1);
      return `z.record(z.string(), ${valZod})`;
    }
    if (!schema.properties) {
      return "z.record(z.string(), z.unknown())";
    }
    const required = new Set(schema.required ?? []);
    const indent = "  ".repeat(depth + 1);
    const lines = Object.entries(schema.properties).map(([key, prop]: [string, any]) => {
      let zodType = schemaToZod(prop as any, parentName, key, depth + 1);
      if (!required.has(key)) {
        zodType += ".optional()";
      }
      return `${indent}${safeKey(key)}: ${zodType},`;
    });
    return `z.object({\n${lines.join("\n")}\n${"  ".repeat(depth)}})`;
  }

  if (type === "string") {
    if (schema.format === "date-time") return "z.string().datetime({ offset: true })";
    if (schema.format === "binary") return "z.instanceof(Blob)";
    return "z.string()";
  }

  if (type === "integer") return "z.number().int()";
  if (type === "number") return "z.number()";
  if (type === "boolean") return "z.boolean()";

  return "z.unknown()";
}

// ── Categorize schemas ───────────────────────────────────────────────
interface SchemaEntry {
  rawName: string;
  typeName: string;
  category: "models" | "requests" | "filters" | "enums";
  schema: any;
}

function categorize(rawName: string, schema: any): SchemaEntry["category"] {
  if (schema.enum) return "enums";
  if (/Filter/i.test(rawName) && !/Request/i.test(rawName)) return "filters";
  if (/Request/i.test(rawName)) return "requests";
  return "models";
}

const entries: SchemaEntry[] = Object.entries(schemas).map(([rawName, schema]) => ({
  rawName,
  typeName: resolveTypeName(rawName),
  category: categorize(rawName, schema as any),
  schema,
}));

// ── Group by domain for file organization ────────────────────────────
const domainPrefixes = [
  "Approval",
  "Assignment",
  "Attendance",
  "Audit",
  "Balance",
  "Client",
  "CustomField",
  "Entity",
  "Estimate",
  "Expense",
  "Group",
  "Holiday",
  "Invoice",
  "Member",
  "Membership",
  "Policy",
  "Project",
  "Rate",
  "Report",
  "Role",
  "Scheduling",
  "SharedReport",
  "Tag",
  "Task",
  "Template",
  "TimeEntry",
  "TimeOff",
  "TimeInterval",
  "User",
  "Webhook",
  "Workspace",
];

function getDomain(typeName: string): string {
  for (const prefix of domainPrefixes) {
    if (typeName.startsWith(prefix)) {
      return prefix
        .replace(/([A-Z])/g, "-$1")
        .replace(/^-/, "")
        .toLowerCase();
    }
  }
  return "common";
}

// ── Collect cross-references ($ref names) ────────────────────────────
function collectRefs(schema: any): Set<string> {
  const refs = new Set<string>();
  const walk = (s: any) => {
    if (!s) return;
    if (s.$ref) {
      const { rawName } = resolveRef(s.$ref);
      refs.add(rawName);
    }
    if (s.allOf) s.allOf.forEach(walk);
    if (s.oneOf) s.oneOf.forEach(walk);
    if (s.anyOf) s.anyOf.forEach(walk);
    if (s.items) walk(s.items);
    if (s.properties) Object.values(s.properties).forEach(walk);
    if (s.additionalProperties && typeof s.additionalProperties === "object") walk(s.additionalProperties);
  };
  walk(schema);
  return refs;
}

// ── Build file map and determine file placement ──────────────────────
// rawName -> fileKey
rawNameToFileKey = new Map<string, string>();
for (const entry of entries) {
  const domain = getDomain(entry.typeName);
  const fileKey = `${entry.category}/${domain}`;
  rawNameToFileKey.set(entry.rawName, fileKey);
}

interface FileContent {
  entries: SchemaEntry[];
}

const fileMap = new Map<string, FileContent>();

for (const entry of entries) {
  const fileKey = rawNameToFileKey.get(entry.rawName)!;
  if (!fileMap.has(fileKey)) {
    fileMap.set(fileKey, { entries: [] });
  }
  fileMap.get(fileKey)!.entries.push(entry);
}

// ── Topological sort within each file ────────────────────────────────
function topoSort(fileEntries: SchemaEntry[], fileKey: string): SchemaEntry[] {
  const inFile = new Set(fileEntries.map((e) => e.rawName));
  const sorted: SchemaEntry[] = [];
  const visited = new Set<string>();
  const visiting = new Set<string>();

  const entryByRaw = new Map(fileEntries.map((e) => [e.rawName, e]));

  function visit(rawName: string) {
    if (visited.has(rawName)) return;
    if (visiting.has(rawName)) {
      // Circular reference — break the cycle, will use lazy init
      return;
    }
    visiting.add(rawName);
    const entry = entryByRaw.get(rawName);
    if (entry) {
      const deps = collectRefs(entry.schema);
      for (const dep of deps) {
        if (inFile.has(dep) && dep !== rawName) {
          visit(dep);
        }
      }
    }
    visiting.delete(rawName);
    visited.add(rawName);
    if (entry) sorted.push(entry);
  }

  for (const e of fileEntries) {
    visit(e.rawName);
  }

  return sorted;
}

// ── Write files ──────────────────────────────────────────────────────
const allExports: { category: string; domain: string; typeNames: string[] }[] = [];

for (const [fileKey, content] of fileMap) {
  const [category, domain] = fileKey.split("/");
  const dirPath = join(TYPES_DIR, category);
  mkdirSync(dirPath, { recursive: true });

  // Topological sort entries
  const sorted = topoSort(content.entries, fileKey);

  // Collect all imports needed from other files
  const importsByFile = new Map<string, Set<string>>();

  for (const entry of sorted) {
    const refs = collectRefs(entry.schema);
    for (const refRaw of refs) {
      if (refRaw === entry.rawName) continue;
      const refFileKey = rawNameToFileKey.get(refRaw);
      if (!refFileKey || refFileKey === fileKey) continue;

      const refTypeName = resolveTypeName(refRaw);
      const [refCat, refDomain] = refFileKey.split("/");
      const relPath = refCat === category ? `./${refDomain}.js` : `../${refCat}/${refDomain}.js`;

      if (!importsByFile.has(relPath)) {
        importsByFile.set(relPath, new Set());
      }
      importsByFile.get(relPath)!.add(refTypeName);
      importsByFile.get(relPath)!.add(toZodName(refTypeName));
    }
  }

  const importLines: string[] = [];
  for (const [path, names] of [...importsByFile].sort()) {
    const sortedNames = [...names].sort();
    importLines.push(`import { ${sortedNames.join(", ")} } from "${path}";`);
  }

  // Generate type declarations and zod schemas
  const typeDecls: string[] = [];
  const zodDecls: string[] = [];
  currentFileKey = fileKey;

  for (const entry of sorted) {
    const tsBody = schemaToTs(entry.schema, entry.rawName);
    if (entry.schema.enum) {
      typeDecls.push(`export type ${entry.typeName} = ${tsBody};`);
    } else {
      typeDecls.push(
        `export interface ${entry.typeName} ${tsBody.startsWith("{") ? tsBody : `{\n  _value: ${tsBody};\n}`}`
      );
    }

    const zodName = toZodName(entry.typeName);
    const zodBody = schemaToZod(entry.schema, entry.rawName);

    // Detect self-referencing schemas (circular references)
    const refs = collectRefs(entry.schema);
    const isSelfRef = refs.has(entry.rawName);
    if (isSelfRef) {
      zodDecls.push(
        `export const ${zodName}: z.ZodType<${entry.typeName}> = z.lazy(() =>\n  ${zodBody}\n);`
      );
    } else {
      zodDecls.push(`export const ${zodName} = ${zodBody};`);
    }
  }

  const fileContent = [
    "// Auto-generated from openapi.json — do not edit by hand",
    "// Run: npx tsx scripts/generate-types.ts",
    "",
    'import { z } from "zod";',
    ...importLines,
    "",
    "// ── TypeScript Interfaces ─────────────────────────────────────────",
    "",
    ...typeDecls,
    "",
    "// ── Zod Schemas ──────────────────────────────────────────────────",
    "",
    ...zodDecls,
    "",
  ].join("\n");

  const filePath = join(dirPath, `${domain}.ts`);
  writeFileSync(filePath, fileContent);
  console.log(`  wrote ${filePath.replace(ROOT + "/", "")}`);

  allExports.push({
    category,
    domain,
    typeNames: sorted.map((e) => e.typeName),
  });
}

// ── Write barrel index files ─────────────────────────────────────────
const categories = [...new Set(allExports.map((e) => e.category))];
for (const cat of categories) {
  const catExports = allExports.filter((e) => e.category === cat);
  const indexLines = catExports
    .sort((a, b) => a.domain.localeCompare(b.domain))
    .map((e) => `export * from "./${e.domain}.js";`);

  const indexPath = join(TYPES_DIR, cat, "index.ts");
  writeFileSync(indexPath, ["// Auto-generated barrel export", ...indexLines, ""].join("\n"));
  console.log(`  wrote ${indexPath.replace(ROOT + "/", "")}`);
}

// Top-level types index
const topIndex = categories
  .sort()
  .map((c) => `export * from "./${c}/index.js";`)
  .join("\n");
writeFileSync(join(TYPES_DIR, "index.ts"), ["// Auto-generated barrel export", topIndex, ""].join("\n"));
console.log(`  wrote src/types/index.ts`);

// ── Write anomalies report ───────────────────────────────────────────
const anomalyPath = join(ROOT, "src", "anomalies", "spec-anomalies.json");
writeFileSync(anomalyPath, JSON.stringify(anomalies, null, 2));
console.log(`\n  Found ${anomalies.length} anomalies — wrote ${anomalyPath.replace(ROOT + "/", "")}`);

// ── Write mapping file (raw OpenAPI name ↔ our type name) ────────────
const mapping = entries.map((e) => ({
  openApiName: e.rawName,
  typeName: e.typeName,
  zodSchemaName: toZodName(e.typeName),
  category: e.category,
  domain: getDomain(e.typeName),
}));
const mappingPath = join(ROOT, "src", "types", "schema-map.json");
writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
console.log(`  wrote src/types/schema-map.json`);

console.log(`\nDone. Generated types for ${entries.length} schemas.`);
