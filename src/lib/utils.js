import { ref, computed } from 'vue';

export function cachedRef (key, defaultValue) {
  const reference = ref(window.localStorage.getItem(key) || defaultValue);
  return computed({
    get: () => reference.value,
    set (value) {
      window.localStorage.setItem(key, value);
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
