import { ref, computed } from 'vue';

export function cachedRef (key, defaultValue) {
  const reference = ref(window.localStorage.getItem(key) || defaultValue);
  return computed({
    get () {
      return reference.value;
    },
    set (value) {
      window.localStorage.setItem(key, value);
      reference.value = value;
    },
  });
}
