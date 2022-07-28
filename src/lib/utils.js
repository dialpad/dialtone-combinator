import { DEFAULT_PREFIX } from '@/src/lib/constants';

export function flatten (obj) {
  const result = {};
  for (const key in obj) {
    result[key] = obj[key];
  }
  return result;
}

const UNIQUE_ID_MAP = {};
export function getUniqueString (prefix = DEFAULT_PREFIX) {
  let id = UNIQUE_ID_MAP[prefix];
  if (!id) {
    id = 0;
    UNIQUE_ID_MAP[prefix] = id;
  }
  return `${prefix}${UNIQUE_ID_MAP[prefix]++}`;
}
