// src/core/http/FetchHttpClient.test.ts

/**
 * @file Unit tests for FetchHttpClient adapter.
 */

import { FetchHttpClient } from "./FetchHttpClient";

describe("FetchHttpClient", () => {
  const ORIGINAL_FETCH = global.fetch;

  afterEach(() => {
    global.fetch = ORIGINAL_FETCH as any;
    jest.restoreAllMocks();
  });

  it("performs a GET and parses JSON", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({ hello: "world" }),
      text: async () => "",
    });

    const http = new FetchHttpClient();
    const res = await http.request<{ hello: string }>({
      url: "https://api.test/hello",
    });

    expect(res.ok).toBe(true);
    expect(res.status).toBe(200);
    expect(res.data).toEqual({ hello: "world" });
  });

  it("falls back to text when not JSON", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "text/plain" }),
      json: async () => {
        throw new Error("no json");
      },
      text: async () => "plain",
    });

    const http = new FetchHttpClient();
    const res = await http.request({ url: "https://api.test/text" });

    expect(res.ok).toBe(true);
    expect(res.text).toBe("plain");
  });

  it("applies proxy if provided", async () => {
    const mock = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: async () => ({}),
      text: async () => "",
    });
    global.fetch = mock;

    const http = new FetchHttpClient({ proxyUrl: "https://proxy/?url=" });
    await http.request({ url: "https://target/api" });

    const calledWith = (mock.mock.calls[0][0] as string) || "";
    expect(calledWith.startsWith("https://proxy/?url=")).toBe(true);
    expect(calledWith.includes(encodeURIComponent("https://target/api"))).toBe(
      true
    );
  });
});
