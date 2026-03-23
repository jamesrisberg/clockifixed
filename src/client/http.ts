/**
 * Core HTTP client for Clockify API.
 *
 * Handles authentication, rate limiting, pagination, and base URL resolution.
 */

import { z } from "zod";

// ── Configuration ────────────────────────────────────────────────────

export interface ClockifyConfig {
  /** API key from Clockify profile settings */
  apiKey: string;
  /** Base URL — defaults to global endpoint */
  baseUrl?: string;
  /** Reports base URL — defaults to global reports endpoint */
  reportsBaseUrl?: string;
  /** Max requests per second (default: 10, Clockify limit is 50 for addon tokens) */
  maxRequestsPerSecond?: number;
  /** Default page size for paginated requests */
  defaultPageSize?: number;
}

export interface RequestOptions {
  /** Query parameters */
  params?: Record<string, string | number | boolean | undefined>;
  /** Request body */
  body?: unknown;
  /** Override default headers */
  headers?: Record<string, string>;
  /** Zod schema to validate response */
  schema?: z.ZodType;
  /** If true, use reports base URL */
  useReportsApi?: boolean;
  /** Signal for request cancellation */
  signal?: AbortSignal;
  /** If true, send body as multipart/form-data instead of JSON */
  multipart?: boolean;
}

export interface PaginatedOptions extends RequestOptions {
  /** Page number (1-indexed) */
  page?: number;
  /** Items per page */
  pageSize?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  isLastPage: boolean;
  page: number;
  pageSize: number;
}

// ── Errors ───────────────────────────────────────────────────────────

export class ClockifyApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly statusText: string,
    public readonly body: unknown,
    public readonly url: string,
    public readonly method: string
  ) {
    super(`Clockify API ${method} ${url} → ${status} ${statusText}: ${message}`);
    this.name = "ClockifyApiError";
  }
}

export class ClockifyValidationError extends Error {
  constructor(
    message: string,
    public readonly url: string,
    public readonly zodError: z.ZodError,
    public readonly rawData: unknown
  ) {
    super(`Validation failed for ${url}: ${message}`);
    this.name = "ClockifyValidationError";
  }
}

export class ClockifyRateLimitError extends ClockifyApiError {
  constructor(url: string, method: string, public readonly retryAfterMs: number) {
    super("Rate limited", 429, "Too Many Requests", null, url, method);
    this.name = "ClockifyRateLimitError";
  }
}

// ── Rate limiter ─────────────────────────────────────────────────────

class RateLimiter {
  private timestamps: number[] = [];

  constructor(private maxPerSecond: number) {}

  async acquire(): Promise<void> {
    const now = Date.now();
    this.timestamps = this.timestamps.filter((t) => now - t < 1000);

    if (this.timestamps.length >= this.maxPerSecond) {
      const oldest = this.timestamps[0];
      const waitMs = 1000 - (now - oldest) + 10; // small buffer
      await new Promise((resolve) => setTimeout(resolve, waitMs));
    }

    this.timestamps.push(Date.now());
  }
}

// ── Multipart helper ─────────────────────────────────────────────────

function toFormData(obj: Record<string, unknown>): FormData {
  const form = new FormData();
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue;
    if (value instanceof Blob || value instanceof Uint8Array) {
      const blob = value instanceof Uint8Array ? new Blob([value as any]) : value;
      form.append(key, blob, "file");
    } else if (typeof value === "object") {
      form.append(key, JSON.stringify(value));
    } else {
      form.append(key, String(value));
    }
  }
  return form;
}

// ── HTTP Client ──────────────────────────────────────────────────────

const DEFAULT_BASE_URL = "https://api.clockify.me/api/v1";
const DEFAULT_REPORTS_BASE_URL = "https://reports.api.clockify.me/v1";

export class HttpClient {
  private config: Required<
    Pick<ClockifyConfig, "apiKey" | "baseUrl" | "reportsBaseUrl" | "defaultPageSize">
  >;
  private rateLimiter: RateLimiter;

  constructor(config: ClockifyConfig) {
    this.config = {
      apiKey: config.apiKey,
      baseUrl: (config.baseUrl ?? DEFAULT_BASE_URL).replace(/\/$/, ""),
      reportsBaseUrl: (config.reportsBaseUrl ?? DEFAULT_REPORTS_BASE_URL).replace(/\/$/, ""),
      defaultPageSize: config.defaultPageSize ?? 50,
    };
    this.rateLimiter = new RateLimiter(config.maxRequestsPerSecond ?? 10);
  }

  private buildUrl(path: string, options?: RequestOptions): URL {
    const base = options?.useReportsApi ? this.config.reportsBaseUrl : this.config.baseUrl;
    const url = new URL(`${base}${path}`);

    if (options?.params) {
      for (const [key, value] of Object.entries(options.params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    return url;
  }

  private async request<T>(method: string, path: string, options?: RequestOptions): Promise<T> {
    await this.rateLimiter.acquire();

    const url = this.buildUrl(path, options);

    const isMultipart = options?.multipart && options?.body !== undefined && method !== "GET";

    const headers: Record<string, string> = {
      "X-Api-Key": this.config.apiKey,
      Accept: "application/json",
      ...options?.headers,
    };

    // Don't set Content-Type for multipart — fetch sets it with the boundary
    if (!isMultipart) {
      headers["Content-Type"] = "application/json";
    }

    const fetchOptions: globalThis.RequestInit = {
      method,
      headers,
      signal: options?.signal,
    };

    if (options?.body !== undefined && method !== "GET") {
      if (isMultipart) {
        fetchOptions.body = toFormData(options.body as Record<string, unknown>);
      } else {
        fetchOptions.body = JSON.stringify(options.body);
      }
    }

    const response = await fetch(url.toString(), fetchOptions);

    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get("Retry-After") ?? "1", 10);
      throw new ClockifyRateLimitError(url.toString(), method, retryAfter * 1000);
    }

    if (!response.ok) {
      let body: unknown;
      try {
        body = await response.json();
      } catch {
        body = await response.text().catch(() => null);
      }

      const message = typeof body === "object" && body !== null && "message" in body
        ? String((body as any).message)
        : String(body ?? response.statusText);

      throw new ClockifyApiError(message, response.status, response.statusText, body, url.toString(), method);
    }

    // Handle 204 No Content
    if (response.status === 204) {
      return undefined as T;
    }

    const data = await response.json();

    // Validate with Zod schema if provided
    if (options?.schema) {
      const result = options.schema.safeParse(data);
      if (!result.success) {
        throw new ClockifyValidationError(
          result.error.message,
          url.toString(),
          result.error,
          data
        );
      }
      return result.data as T;
    }

    return data as T;
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("GET", path, options);
  }

  async post<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("POST", path, options);
  }

  async put<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("PUT", path, options);
  }

  async patch<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("PATCH", path, options);
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>("DELETE", path, options);
  }

  /**
   * Paginated GET — returns a single page with metadata.
   */
  async getPaginated<T>(path: string, options?: PaginatedOptions): Promise<PaginatedResult<T>> {
    const page = options?.page ?? 1;
    const pageSize = options?.pageSize ?? this.config.defaultPageSize;

    const params = {
      ...options?.params,
      page: page,
      "page-size": pageSize,
    };

    const response = await fetch(
      this.buildUrl(path, { ...options, params }).toString(),
      {
        method: "GET",
        headers: {
          "X-Api-Key": this.config.apiKey,
          "Content-Type": "application/json",
          Accept: "application/json",
          ...options?.headers,
        },
        signal: options?.signal,
      }
    );

    if (!response.ok) {
      let body: unknown;
      try {
        body = await response.json();
      } catch {
        body = null;
      }
      const message = typeof body === "object" && body !== null && "message" in body
        ? String((body as any).message)
        : response.statusText;
      throw new ClockifyApiError(message, response.status, response.statusText, body, path, "GET");
    }

    const isLastPage = response.headers.get("Last-Page")?.toLowerCase() === "true";
    const data = await response.json();

    if (options?.schema) {
      const arraySchema = z.array(options.schema);
      const result = arraySchema.safeParse(data);
      if (!result.success) {
        throw new ClockifyValidationError(
          result.error.message,
          path,
          result.error,
          data
        );
      }
      return { data: result.data as T[], isLastPage, page, pageSize };
    }

    return { data: data as T[], isLastPage, page, pageSize };
  }

  /**
   * Auto-paginate — yields all items across all pages.
   */
  async *getAllPages<T>(path: string, options?: PaginatedOptions): AsyncGenerator<T[], void, unknown> {
    let page = options?.page ?? 1;
    let isLastPage = false;

    while (!isLastPage) {
      const result = await this.getPaginated<T>(path, { ...options, page });
      yield result.data;
      isLastPage = result.isLastPage;
      page++;
    }
  }

  /**
   * Collect all pages into a single array.
   */
  async collectAllPages<T>(path: string, options?: PaginatedOptions): Promise<T[]> {
    const all: T[] = [];
    for await (const page of this.getAllPages<T>(path, options)) {
      all.push(...page);
    }
    return all;
  }
}
