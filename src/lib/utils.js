import { ref, computed } from 'vue';

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

export function flatten (obj) {
  const result = {};
  for (const key in obj) {
    result[key] = obj[key];
  }
  return result;
}
