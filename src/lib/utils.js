import { DEFAULT_PREFIX } from '@/src/lib/constants';

export function flatten (obj) {
  const result = {};
  for (const key in obj) {
    result[key] = obj[key];
  }
  return result;
}

let UNIQUE_ID_COUNTER = 0;
export function getUniqueString (prefix = DEFAULT_PREFIX) {
  return `${prefix}${UNIQUE_ID_COUNTER++}`;
}
