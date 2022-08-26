import { DEFAULT_PREFIX } from '@/src/lib/constants';

/**
 * Copy all the entries of an object into a new object.
 *
 * @param {object} obj - The target object.
 * @returns {object} The flattened object.
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
 * @type {object}
 */
const UNIQUE_ID_MAP = {};

/**
 * Gets the next string value given a prefix.
 *
 * @param {string} prefix - The prefix that will be uniquely incremented.
 * @returns {string} The next unique string for given prefix.
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
 * Gives some more specific type names such as 'array' etc...
 *
 * @param {*} value - The value.
 * @returns {string|null} The specific member type.
 */
export function typeOfMemberValue (value) {
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

export function enumerateGroups (handler, groups) {
  Object.entries(groups).forEach(([group, entries]) => {
    entries?.forEach(entry => {
      handler(group, entry);
    });
  });
}
