import { DEFAULT_PREFIX } from '@/src/lib/constants';

export const UNSET = Symbol('unset');

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

export function typeOfMember (value) {
  if (value == null) {
    return null;
  }

  const type = typeof value;
  switch (type) {
    case 'symbol': {
      return value.toString();
    }
    case 'object': {
      return Array.isArray(value)
        ? 'array'
        : 'object';
    }
    default: return type;
  }
}
