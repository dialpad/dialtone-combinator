import { paramCase } from 'change-case';
import { computed, ref } from 'vue';

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

export function getTagArray (tags) {
  return Object.values(tags).flat();
}

export function getPropLabel (name, tags) {
  if (!tags) {
    return paramCase(name);
  }

  const modelTag = getTagArray(tags).find(tag => tag.title === 'model');

  const label = modelTag
    ? modelTag.description
    : name;

  return paramCase(label);
}

export function hasModelTag (tags) {
  return getTagArray(tags).some(tag => tag.title === 'model');
}
