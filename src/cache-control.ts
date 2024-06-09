import { parseCacheControl, serializeCacheControl } from "./parse.js";
import type { CacheControlSettings } from "./settings.js";

/**
 * Creates a CacheControl instance with the provided settings.
 *
 * @param settings - An object containing cache control settings.
 * @returns The CacheControl instance.
 *
 * @example
 * ```ts
 * const cacheShort = new CacheControl({
 *   maxAge: 60,
 *   staleWhileRevalidate: 60,
 * });
 * new Response("data", {
 *   headers: { "Cache-Control": cacheShort.serialize() },
 * });
 * ```
 */
export class CacheControl {
  public settings: CacheControlSettings;

  constructor(settings: CacheControlSettings) {
    this.settings = { ...settings };
  }

  /**
   * Serializes the cache control settings into a Cache-Control header string.
   *
   * @returns The serialized Cache-Control header string.
   */
  serialize(): string {
    return serializeCacheControl(this.settings);
  }

  static serialize(settings: CacheControlSettings): string {
    return serializeCacheControl(settings);
  }

  static parse(header: string): CacheControl {
    return new CacheControl(parseCacheControl(header));
  }
}
