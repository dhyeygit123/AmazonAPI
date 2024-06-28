const NodeCache = require('node-cache');

class CacheService {
  constructor(ttlSeconds) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    return this.cache.set(key, value);
  }

  del(keys) {
    return this.cache.del(keys);
  }

  flush() {
    return this.cache.flushAll();
  }
}

module.exports = new CacheService(600); // Cache for 10 minutes