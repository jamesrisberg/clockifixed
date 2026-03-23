import { describe, it, expect } from "vitest";
import { HttpClient, ClockifyApiError, ClockifyConfig } from "./http.js";

describe("HttpClient", () => {
  it("should construct with minimal config", () => {
    const client = new HttpClient({ apiKey: "test-key" });
    expect(client).toBeDefined();
  });

  it("should construct with full config", () => {
    const config: ClockifyConfig = {
      apiKey: "test-key",
      baseUrl: "https://custom.clockify.me/api/v1",
      reportsBaseUrl: "https://reports.custom.clockify.me/v1",
      maxRequestsPerSecond: 5,
      defaultPageSize: 25,
    };
    const client = new HttpClient(config);
    expect(client).toBeDefined();
  });
});

describe("ClockifyApiError", () => {
  it("should format error message with method and URL", () => {
    const error = new ClockifyApiError(
      "Not found",
      404,
      "Not Found",
      { message: "Not found" },
      "https://api.clockify.me/api/v1/workspaces/123",
      "GET"
    );
    expect(error.message).toContain("GET");
    expect(error.message).toContain("404");
    expect(error.status).toBe(404);
    expect(error.name).toBe("ClockifyApiError");
  });
});
