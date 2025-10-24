// src/core/http/FetchHttpClient.ts

/**
 * @file FetchHttpClient adapter.
 * @description
 * HTTP adapter backed by the browser's fetch API.
 * Supports optional CORS proxying via a constructor option.
 */

import type { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";
import { eventBus, HttpEvents } from "@/core/events/EventBus";

export interface FetchHttpClientOptions {
  /**
   * Optional CORS proxy base URL. If provided, requests are redirected to:
   *   `${proxyUrl}${encodeURIComponent(originalUrl)}`
   * Example: 'https://api.allorigins.win/raw?url=' or '/proxy?url='
   */
  proxyUrl?: string;
  /** Default headers applied to all requests (merged with per-request headers). */
  defaultHeaders?: Record<string, string>;
  /** Timeout in ms (best-effort via AbortController). */
  timeoutMs?: number;
}

export class FetchHttpClient implements HttpClient {
  private readonly proxyUrl?: string;
  private readonly defaultHeaders: Record<string, string>;
  private readonly timeoutMs?: number;

  constructor(opts: FetchHttpClientOptions = {}) {
    this.proxyUrl = opts.proxyUrl;
    this.defaultHeaders = opts.defaultHeaders ?? {};
    this.timeoutMs = opts.timeoutMs;
  }

  async request<T = unknown>(req: HttpRequest): Promise<HttpResponse<T>> {
    eventBus.publish(HttpEvents.Start);
    const controller =
      typeof AbortController !== "undefined"
        ? new AbortController()
        : undefined;
    const id =
      this.timeoutMs && controller
        ? setTimeout(() => controller.abort(), this.timeoutMs)
        : undefined;

    try {
      const url = this.proxyUrl
        ? `${this.proxyUrl}${encodeURIComponent(req.url)}`
        : req.url;

      const headers: Record<string, string> = {
        Accept: "application/json, text/plain, */*",
        ...this.defaultHeaders,
        ...(req.headers ?? {}),
      };

      let body: BodyInit | undefined;
      if (req.body !== undefined && req.body !== null) {
        if (typeof req.body === "string" || req.body instanceof FormData) {
          body = req.body as BodyInit;
        } else {
          headers["Content-Type"] =
            headers["Content-Type"] ?? "application/json";
          body = JSON.stringify(req.body);
        }
      }

      const res = await fetch(url, {
        method: req.method ?? "GET",
        headers,
        body,
        signal: controller?.signal,
      });

      const contentType = res.headers.get("content-type") || "";
      const headersObj: Record<string, string> = {};
      res.headers.forEach((v, k) => (headersObj[k] = v));

      let data: T | undefined;
      let text: string | undefined;
      if (contentType.includes("application/json")) {
        data = (await res.json()) as T;
      } else {
        text = await res.text();
        const trimmed = text.trim();
        if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
          try {
            data = JSON.parse(trimmed) as T;
          } catch {}
        }
      }

      return {
        status: res.status,
        ok: res.ok,
        data,
        text,
        headers: headersObj,
      };
    } finally {
      if (id) clearTimeout(id);
      eventBus.publish(HttpEvents.End);
    }
  }
}
