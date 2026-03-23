import { describe, it, expect } from "vitest";
import { z } from "zod";
import { checkSchema, checkArraySchema } from "./schema-checker.js";

describe("checkSchema", () => {
  const schema = z.object({
    id: z.string(),
    name: z.string(),
    count: z.number().optional(),
  });

  it("should pass for valid data", () => {
    const result = checkSchema({ id: "1", name: "test" }, schema);
    expect(result.valid).toBe(true);
    expect(result.divergences).toHaveLength(0);
  });

  it("should detect wrong type", () => {
    const result = checkSchema({ id: 123, name: "test" }, schema);
    expect(result.valid).toBe(false);
    expect(result.divergences.length).toBeGreaterThan(0);
    expect(result.divergences[0].issue).toBe("wrong_type");
    expect(result.divergences[0].path).toBe("id");
  });

  it("should detect missing required field", () => {
    const result = checkSchema({ id: "1" }, schema);
    expect(result.valid).toBe(false);
    expect(result.divergences.length).toBeGreaterThan(0);
  });

  it("should detect undocumented fields", () => {
    const result = checkSchema(
      { id: "1", name: "test", secretField: "surprise", anotherOne: 42 },
      schema
    );
    expect(result.valid).toBe(true); // Zod strips extra fields by default in passthrough? No, it ignores them
    expect(result.undocumentedFields).toHaveLength(2);
    expect(result.undocumentedFields[0].path).toBe("secretField");
    expect(result.undocumentedFields[1].path).toBe("anotherOne");
  });

  it("should detect nested undocumented fields", () => {
    const nestedSchema = z.object({
      id: z.string(),
      meta: z.object({
        color: z.string(),
      }).optional(),
    });

    const result = checkSchema(
      { id: "1", meta: { color: "red", hidden: true } },
      nestedSchema
    );
    expect(result.undocumentedFields.some((f) => f.path === "meta.hidden")).toBe(true);
  });
});

describe("checkArraySchema", () => {
  const itemSchema = z.object({
    id: z.string(),
    value: z.number(),
  });

  it("should pass for valid array", () => {
    const data = [
      { id: "1", value: 10 },
      { id: "2", value: 20 },
    ];
    const result = checkArraySchema(data, itemSchema);
    expect(result.valid).toBe(true);
  });

  it("should detect invalid items", () => {
    const data = [
      { id: "1", value: "not a number" },
      { id: "2", value: 20 },
    ];
    const result = checkArraySchema(data, itemSchema);
    expect(result.valid).toBe(false);
    expect(result.divergences.length).toBeGreaterThan(0);
  });

  it("should handle empty arrays", () => {
    const result = checkArraySchema([], itemSchema);
    expect(result.valid).toBe(true);
    expect(result.divergences).toHaveLength(0);
    expect(result.undocumentedFields).toHaveLength(0);
  });

  it("should find undocumented fields in array items", () => {
    const data = [{ id: "1", value: 10, extra: "bonus" }];
    const result = checkArraySchema(data, itemSchema);
    expect(result.undocumentedFields.some((f) => f.path.includes("extra"))).toBe(true);
  });
});
