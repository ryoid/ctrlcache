// tsx watch --conditions=development will run from src
// omit conditions to run from dist
import { CacheControl } from "#ctrlcache";

const c = new CacheControl({
  maxAge: 1000,
});

console.log(c.serialize());
