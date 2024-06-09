import type { CacheControlSettings } from "./settings.js";

export function parseCacheControl(header: string): CacheControlSettings {
  const directives = header.replace("Cache-Control:", "").split(",");
  const settings: CacheControlSettings = {};

  for (const directive of directives) {
    const [key, value] = directive.split("=");

    switch (key.trim()) {
      case "max-age": {
        const parsedValue = safeParseNumber(value);
        if (parsedValue === undefined) {
          break;
        }
        settings.maxAge = parsedValue;
        break;
      }
      case "s-maxage": {
        const parsedValue = safeParseNumber(value);
        if (parsedValue === undefined) {
          break;
        }
        settings.sMaxAge = parsedValue;
        break;
      }
      case "max-stale": {
        const parsedValue = safeParseNumber(value);
        if (parsedValue === undefined) {
          break;
        }
        settings.maxStale = parsedValue;
        break;
      }
      case "min-fresh": {
        const parsedValue = safeParseNumber(value);
        if (parsedValue === undefined) {
          break;
        }
        settings.minFresh = parsedValue;
        break;
      }
      case "stale-while-revalidate": {
        const parsedValue = safeParseNumber(value);
        if (parsedValue === undefined) {
          break;
        }
        settings.staleWhileRevalidate = parsedValue;
        break;
      }
      case "stale-if-error": {
        const parsedValue = safeParseNumber(value);
        if (parsedValue === undefined) {
          break;
        }
        settings.staleIfError = parsedValue;
        break;
      }
      case "must-revalidate": {
        settings.mustRevalidate = true;
        break;
      }
      case "no-cache": {
        settings.noCache = true;
        break;
      }
      case "no-store": {
        settings.noStore = true;
        break;
      }
      case "no-transform": {
        settings.noTransform = true;
        break;
      }
      case "only-if-cached": {
        settings.onlyIfCached = true;
        break;
      }
      case "public": {
        settings.public = true;
        break;
      }
      case "private": {
        settings.private = true;
        break;
      }
      case "proxy-revalidate": {
        settings.proxyRevalidate = true;
        break;
      }
      default: {
        break;
      }
    }
  }

  return settings;
}

/**
 * Try to parse a number from a string.
 *
 * Gracefully handle invalid numbers by returning undefined.
 *
 * @param value
 * @returns
 */
function safeParseNumber(value: string) {
  const maxAge = Number(value);
  if (Number.isNaN(maxAge)) {
    return undefined;
  }
  return maxAge;
}

/**
 * Serializes the cache control settings into a Cache-Control header string.
 *
 * @param settings - The cache control settings.
 * @returns The serialized Cache-Control header string.
 */
export function serializeCacheControl(settings: CacheControlSettings): string {
  const directives: string[] = [];

  if (settings.maxAge !== undefined) {
    directives.push(`max-age=${settings.maxAge}`);
  }
  if (settings.sMaxAge !== undefined) {
    directives.push(`s-maxage=${settings.sMaxAge}`);
  }
  if (settings.maxStale !== undefined) {
    directives.push(`max-stale=${settings.maxStale}`);
  }
  if (settings.minFresh !== undefined) {
    directives.push(`min-fresh=${settings.minFresh}`);
  }
  if (settings.mustRevalidate) directives.push(`must-revalidate`);
  if (settings.noCache) directives.push(`no-cache`);
  if (settings.noStore) directives.push(`no-store`);
  if (settings.noTransform) directives.push(`no-transform`);
  if (settings.onlyIfCached) directives.push(`only-if-cached`);
  if (settings.public) directives.push(`public`);
  if (settings.private) directives.push(`private`);
  if (settings.proxyRevalidate) directives.push(`proxy-revalidate`);
  if (settings.staleWhileRevalidate !== undefined) {
    directives.push(`stale-while-revalidate=${settings.staleWhileRevalidate}`);
  }
  if (settings.staleIfError !== undefined) {
    directives.push(`stale-if-error=${settings.staleIfError}`);
  }

  return directives.join(", ");
}
