import { describe, expect, test } from "vitest";
import { CacheControl } from "./cache-control.js";

// Test cases for the CacheControl class
describe("CacheControl serialization", () => {
  test("should serialize maxAge correctly", () => {
    const cacheControl = new CacheControl({ maxAge: 60 });
    const result = cacheControl.serialize();
    expect(result).toBe("max-age=60");
  });

  test("should serialize multiple directives correctly", () => {
    const cacheControl = new CacheControl({
      maxAge: 60,
      noCache: true,
      staleWhileRevalidate: 120,
    });
    const result = cacheControl.serialize();
    expect(result).toBe("max-age=60, no-cache, stale-while-revalidate=120");
  });

  test("should handle undefined values gracefully", () => {
    const cacheControl = new CacheControl({
      maxAge: 60,
      noCache: true,
      sMaxAge: undefined,
    });
    const result = cacheControl.serialize();
    expect(result).toBe("max-age=60, no-cache");
  });

  test("should handle no settings correctly", () => {
    const cacheControl = new CacheControl({});
    const result = cacheControl.serialize();
    expect(result).toBe("");
  });

  test("should serialize all possible settings correctly", () => {
    const cacheControl = new CacheControl({
      maxAge: 60,
      sMaxAge: 120,
      maxStale: 180,
      minFresh: 240,
      mustRevalidate: true,
      noCache: true,
      noStore: true,
      noTransform: true,
      onlyIfCached: true,
      public: true,
      private: true,
      proxyRevalidate: true,
      staleWhileRevalidate: 300,
      staleIfError: 360,
    });
    const result = cacheControl.serialize();
    expect(result).toBe(
      "max-age=60, s-maxage=120, max-stale=180, min-fresh=240, must-revalidate, no-cache, no-store, no-transform, only-if-cached, public, private, proxy-revalidate, stale-while-revalidate=300, stale-if-error=360",
    );
  });

  test("should serialize boolean settings", () => {
    const cacheControl = new CacheControl({
      mustRevalidate: true,
      noCache: false,
      noStore: false,
      noTransform: true,
      onlyIfCached: true,
      public: true,
      private: true,
      proxyRevalidate: true,
    });
    const result = cacheControl.serialize();
    expect(result).toBe(
      "must-revalidate, no-transform, only-if-cached, public, private, proxy-revalidate",
    );
  });

  test("should serialize numeric settings", () => {
    const cacheControl = new CacheControl({
      maxAge: 60,
      sMaxAge: 120,
      maxStale: 180,
      minFresh: 240,
      staleWhileRevalidate: 300,
      staleIfError: 360,
    });
    const result = cacheControl.serialize();
    expect(result).toBe(
      "max-age=60, s-maxage=120, max-stale=180, min-fresh=240, stale-while-revalidate=300, stale-if-error=360",
    );
  });

  test("should serialize combination of defined and undefined settings", () => {
    const cacheControl = new CacheControl({
      maxAge: 60,
      sMaxAge: undefined,
      noCache: true,
      staleWhileRevalidate: undefined,
      staleIfError: 360,
    });
    const result = cacheControl.serialize();
    expect(result).toBe("max-age=60, no-cache, stale-if-error=360");
  });
});

// Test cases for the CacheControl.parse function
describe("CacheControl parsing", () => {
  test("should parse maxAge correctly", () => {
    const header = "Cache-Control: max-age=60";
    const result = CacheControl.parse(header);
    expect(result.settings).toEqual({ maxAge: 60 });
  });

  test("should parse multiple directives correctly", () => {
    const header =
      "Cache-Control: max-age=60, no-cache, stale-while-revalidate=120";
    const result = CacheControl.parse(header);
    expect(result.settings).toEqual({
      maxAge: 60,
      noCache: true,
      staleWhileRevalidate: 120,
    });
  });

  test("should handle no directives correctly", () => {
    const result = CacheControl.parse("Cache-Control: ");
    expect(result.settings).toEqual({});
    const result2 = CacheControl.parse(" ");
    expect(result2.settings).toEqual({});
  });

  test("should parse all possible directives correctly", () => {
    const header =
      "Cache-Control: max-age=60, s-maxage=120, max-stale=180, min-fresh=240, must-revalidate, no-cache, no-store, no-transform, only-if-cached, public, private, proxy-revalidate, stale-while-revalidate=300, stale-if-error=360";
    const result = CacheControl.parse(header);
    expect(result.settings).toEqual({
      maxAge: 60,
      sMaxAge: 120,
      maxStale: 180,
      minFresh: 240,
      mustRevalidate: true,
      noCache: true,
      noStore: true,
      noTransform: true,
      onlyIfCached: true,
      public: true,
      private: true,
      proxyRevalidate: true,
      staleWhileRevalidate: 300,
      staleIfError: 360,
    });
  });

  test("should parse boolean directives correctly", () => {
    const header =
      "Cache-Control: must-revalidate, no-cache, no-store, no-transform, only-if-cached, public, private, proxy-revalidate";
    const result = CacheControl.parse(header);
    expect(result.settings).toEqual({
      mustRevalidate: true,
      noCache: true,
      noStore: true,
      noTransform: true,
      onlyIfCached: true,
      public: true,
      private: true,
      proxyRevalidate: true,
    });
  });

  test("should parse numeric directives correctly", () => {
    const header =
      "Cache-Control: max-age=60, s-maxage=120, max-stale=180, min-fresh=240, stale-while-revalidate=300, stale-if-error=360";
    const result = CacheControl.parse(header);
    expect(result.settings).toEqual({
      maxAge: 60,
      sMaxAge: 120,
      maxStale: 180,
      minFresh: 240,
      staleWhileRevalidate: 300,
      staleIfError: 360,
    });
  });

  test("should handle invalid values gracefully", () => {
    const header =
      "Cache-Control: max-age=invalid, no-cache, s-maxage=12, no-store=false, no-transform=12";
    const result = CacheControl.parse(header);
    expect(result.settings).toEqual({
      noCache: true,
      sMaxAge: 12,
      noStore: true,
      noTransform: true,
    });
  });

  test("should handle inconsistent spacing gracefully", () => {
    const header =
      "Cache-Control:max-age=60,    s-maxage=120,max-stale=180,min-fresh=240, stale-while-revalidate=300  ,  stale-if-error = 360  ";
    const result = CacheControl.parse(header);
    expect(result.settings).toEqual({
      maxAge: 60,
      sMaxAge: 120,
      maxStale: 180,
      minFresh: 240,
      staleWhileRevalidate: 300,
      staleIfError: 360,
    });
  });
});
