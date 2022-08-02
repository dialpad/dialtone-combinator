import { paramCase } from 'change-case';
import { computed, ref } from 'vue';
import { getUniqueString } from '@/src/lib/utils';

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

export function computedModel (model, handler) {
  return computed({
    get: () => model,
    set: (e) => handler(e, model),
  });
}

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

export function getPropLabel (name) {
  return paramCase(name);
}
