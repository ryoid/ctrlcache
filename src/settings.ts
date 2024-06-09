/**
 * Interface representing the cache control settings.
 * This interface is used to define caching policies for HTTP responses.
 *
 * Each property corresponds to a specific Cache-Control directive.
 */
export type CacheControlSettings = {
  /**
   * Specifies the maximum amount of time (in seconds) a resource is considered fresh.
   * After this time, the resource will be considered stale.
   * Example: `maxAge: 60` (1 minute).
   */
  maxAge?: number;

  /**
   * Specifies the maximum amount of time (in seconds) a resource is considered fresh in shared caches.
   * This directive is used by CDNs and other intermediary caches.
   * Example: `sMaxAge: 120` (2 minutes).
   */
  sMaxAge?: number;

  /**
   * Specifies the maximum amount of time (in seconds) a client is willing to accept a stale response.
   * This directive allows serving stale content while the client revalidates the resource.
   * Example: `maxStale: 300` (5 minutes).
   */
  maxStale?: number;

  /**
   * Specifies the minimum amount of time (in seconds) that the client wants the resource to be fresh.
   * This directive can be used to avoid getting a stale response from the cache.
   * Example: `minFresh: 30` (30 seconds).
   */
  minFresh?: number;

  /**
   * Indicates that the response must be revalidated with the origin server once it becomes stale.
   * This directive ensures that stale content is not served without revalidation.
   */
  mustRevalidate?: boolean;

  /**
   * Indicates that the response can be stored by caches but must be revalidated with the origin server before reuse.
   * This directive forces caches to submit a request to the origin server for validation before using a cached copy.
   */
  noCache?: boolean;

  /**
   * Indicates that the response should not be stored by any cache.
   * This directive is used to prevent sensitive data from being stored in caches.
   */
  noStore?: boolean;

  /**
   * Indicates that the response should not be transformed by caches.
   * This directive ensures that the response is delivered as-is, without any modification.
   */
  noTransform?: boolean;

  /**
   * Indicates that the client only wants a cached response and will not accept a fresh one.
   * This directive is useful when the client is in offline mode.
   */
  onlyIfCached?: boolean;

  /**
   * Indicates that the response may be stored by any cache, public or private.
   * This directive is often used for publicly accessible resources.
   */
  public?: boolean;

  /**
   * Indicates that the response is intended for a single user and must not be stored by shared caches.
   * This directive is used to protect user-specific data.
   */
  private?: boolean;

  /**
   * Indicates that the response must be revalidated by the proxy once it becomes stale.
   * This directive is similar to `mustRevalidate` but specifically for proxy caches.
   */
  proxyRevalidate?: boolean;

  /**
   * Indicates that the cache may serve stale responses while it revalidates them in the background (in seconds).
   * This directive allows for better performance by serving stale content until fresh content is available.
   * Example: `staleWhileRevalidate: 60` (1 minute).
   */
  staleWhileRevalidate?: number;

  /**
   * Indicates that the cache may serve stale responses if an error occurs (in seconds).
   * This directive ensures availability by serving stale content when the origin server is unreachable.
   * Example: `staleIfError: 600` (10 minutes).
   */
  staleIfError?: number;
};
export type CacheControlSetting = keyof CacheControlSettings;
