<h1 align="center">
	<sup>ctrlcache</sup>
	<br>
	<a href="https://www.npmjs.com/package/ctrlcache"><img src="https://badgen.net/npm/v/ctrlcache" title="NPM version"></a>
  <a href="https://pkg-size.dev/ctrlcache"><img src="https://pkg-size.dev/badge/bundle/2067" title="Bundle size for ctrlcache"></a>
</h1>

Manage and build HTTP `Cache-Control` headers.

### Features

- TypeScript, with TSDoc for [directives](https://github.com/ryoid/ctrlcache/blob/main/src/settings.ts)
- Create _presets_ for reusable cache policies
- Parse `Cache-Control` headers from requests and extend them
- Lightweight, with no dependencies
  <br>

## Install

```bash
npm install ctrlcache
```

## API

Create cache policies and use them in your responses.

```ts
export const cacheShort = new CacheControl({
  maxAge: 60,
  staleWhileRevalidate: 60,
});

new Response("data", {
  headers: { "Cache-Control": cacheShort.serialize() },
});

// Other APIs
CacheControl.parse("max-age=60, stale-while-revalidate=60");
CacheControl.serialize({
  maxAge: 60,
  staleWhileRevalidate: 60,
});
```

### Parse and manage cache control from headers

You can also easily manage cache control from headers of an external response.

```ts
const res = await fetch("https://example.com");
const cacheControl = CacheControl.parse(res.headers.get("Cache-Control"));
// Update the cache control settings
cacheControl.settings.maxAge = 60;

return new Response(res.body, {
  headers: { "Cache-Control": cacheControl.serialize() },
});
```

---

### Directives

For a list of all supported directives, see the [CacheControlSettings type definition](https://github.com/ryoid/ctrlcache/blob/main/src/settings.ts).

### Utilities

We also export functions to parse and serialize cache control headers.

```ts
// Parse a cache control header
// Alias CacheControl.parse
function parseCacheControl(header: string): CacheControlSettings;
// Serialize a cache control settings object to a string
// Alias CacheControl.serialize
function serializeCacheControl(settings: CacheControlSettings): string;
```
