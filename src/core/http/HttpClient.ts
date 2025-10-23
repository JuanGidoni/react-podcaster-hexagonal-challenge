// src/core/http/HttpClient.ts

/**
 * @file HttpClient port.
 * @description
 * Minimal HTTP abstraction for adapters and use-cases.
 * Keeps the domain/app layers decoupled from fetch/axios specifics.
 */

export interface HttpRequest {
  url: string;
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: Record<string, string>;
  /** Body will be JSON.stringified if an object is provided. */
  body?: unknown;
}

export interface HttpResponse<T = unknown> {
  status: number;
  ok: boolean;
  /** Parsed JSON payload when available (generic type param T). */
  data?: T;
  /** Raw text for non-JSON responses (optional). */
  text?: string;
  /** Response headers (subset). */
  headers: Record<string, string>;
}

export interface HttpClient {
  request<T = unknown>(req: HttpRequest): Promise<HttpResponse<T>>;
}
