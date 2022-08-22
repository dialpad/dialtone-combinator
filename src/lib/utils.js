import { DEFAULT_PREFIX } from '@/src/lib/constants';

/**
 * Copy all the entries of an object into a new object.
 *
 * @param obj The target object.
 * @returns {Object}
 */
export function flatten (obj) {
  const result = {};
  for (const key in obj) {
    result[key] = obj[key];
  }
  return result;
}

/**
 * Map of prefixes with their current 'id' numbers.
 * Used by `getUniqueString(...)`
 *
 * @type {Object}
 */
const UNIQUE_ID_MAP = {};

/**
 * Gets the next string value given a prefix.
 *
 * @param prefix
 * @returns {String}
 */
export function getUniqueString (prefix = DEFAULT_PREFIX) {
  let id = UNIQUE_ID_MAP[prefix];
  if (!id) {
    id = 0;
    UNIQUE_ID_MAP[prefix] = id;
  }
  return `${prefix}${UNIQUE_ID_MAP[prefix]++}`;
}

/**
 * Gets specific type name from a value, intended to be used with value from a 'member'.
 *
 * @param value The value.
 * @returns {String | null}
 */
export function typeOfMember (value) {
  if (value === undefined || value === null) {
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

export function enumerateGroups (handler, memberGroups) {
  Object.entries(memberGroups).forEach(([memberGroup, members]) => {
    members.forEach(member => {
      handler(memberGroup, member);
    });
  });
}
