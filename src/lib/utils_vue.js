import { computed, ref } from 'vue';
import { getUniqueString } from '@/src/lib/utils';

/**
 * Property that can be used to store persistent data in local storage for a reactive `ref(...)` object.
 *
 * Wraps a `ref(...)` providing read and write functionality that also updates a local storage value.
 * A value will be searched for in local storage based on the 'key' if not found it will use the 'defaultValue'.
 *
 * Uses JSON serialization so values retain their true data types.
 *
 * @param key The local storage key.
 * @param defaultValue The default value when value is not in local storage.
 * @returns {WritableComputedRef<*>}
 */
export function cachedRef (key, defaultValue) {
  const reference = ref(JSON.parse(window.localStorage.getItem(key)) || defaultValue);
  return computed({
    get: () => reference.value,
    set (value) {
      window.localStorage.setItem(key, JSON.stringify(value));
      reference.value = value;
    },
  });
}

/**
 * Property that can be used with `v-model`.
 * Intended to wrap reactive objects such as `ref(...)` and `reactive(...)`.
 *
 * get: Gets the wrapped object
 * set: Invokes a handler with the first parameter being a provided event value
 *   and the second parameter is the wrapped object. Allows vue emit events to
 *   interact with the wrapped object.
 *
 * @param model The target object to wrap.
 * @param handler The handler function, should take an event value and use it to modify the wrapped object.
 * @returns {WritableComputedRef<*>}
 */
export function computedModel (model, handler) {
  return computed({
    get: () => model,
    set: (e) => handler(e, model),
  });
}

/**
 * Interface for an array of unique 'id' strings where
 * the indexes represent their position in some external iterable.
 *
 * addId: Generate and push 'id' string to array.
 * removeId: Remove 'id' string at index position, returns the 'id' string.
 * getId: Gets the 'id' string at index position,
 *   if 'id' string is not existent a new one will be generated
 *
 * @param prefix
 * @returns {
 *   {
 *     addId: (function(): String),
 *     removeId: (function(Number): String),
 *     getId: (function(Number): String),
 *   }
 * }
 */
export function idMap (prefix) {
  const map = [];

  function add () {
    const id = getUniqueString(prefix);
    map.push(id);
    return id;
  }

  function remove (index) {
    const [id] = map.splice(index, 1);
    return id;
  }

  function get (index) {
    let id = map[index];
    if (!id) {
      id = getUniqueString(prefix);
      map.splice(index, 0, id);
    }
    return id;
  }

  return {
    addId: add,
    removeId: remove,
    getId: get,
  };
}
