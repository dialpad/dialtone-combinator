export class OrderedObject {
  constructor () {
    this.map = new Map();
    return new Proxy(this, {
      get: this.get,
      ownKeys (target) {
        const keys = [];
        for (const key of target.map.keys()) {
          keys.push(key);
        }
        return keys;
      },
      getOwnPropertyDescriptor () {
        return {
          enumerable: true,
          configurable: true,
        };
      },
    });
  }

  get (target, prop) {
    if (target.map.has(prop)) {
      return target.map.get(prop);
    }

    return Reflect.get(target, prop);
  }

  set (key, value) {
    this.map.set(key, value);
  }

  static fromEntries (entries) {
    const obj = new OrderedObject();
    entries.forEach(([key, value]) => {
      obj.set(key, value);
    });
    return obj;
  }

  toJSON () {
    return Object.fromEntries(Object.entries(this));
  }

  [Symbol.iterator] () {
    const iterator = this.map[Symbol.iterator]();
    return {
      next: () => iterator.next(),
    };
  }
}
