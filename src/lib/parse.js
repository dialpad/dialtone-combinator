import JSON5 from 'json5-with-undefined';

/**
 * Attempts to parse the documentation default value information.
 *
 * If unsuccessful, will return 'undefined'.
 *
 * @param defaultInfo The documentation object containing default value data.
 * @returns {*}
 */
export function parseDocDefault (defaultInfo) {
  if (!defaultInfo.value) { return defaultInfo.value; }

  let value;
  try {
    value = defaultInfo.func
      ? parseDocFunc(defaultInfo.value)
      : parseDocValue(defaultInfo.value);
  } catch (e) {
    console.warn(`Unable to parse documentation default value`);
    console.warn(defaultInfo);
  }

  return value;
}

/**
 * Stringifies a documentation value using the docgen format.
 * @returns {string}
 */
export function stringifyDocValue (value) {
  return JSON5.stringify(value);
}

/**
 * Parses a documentation value using the docgen format.
 * @returns {*}
 */
export function parseDocValue (value) {
  return JSON5.parse(value);
}

/**
 * Parses a documentation value from a function.
 *
 * TODO: Currently not implemented.
 *
 * @returns {undefined}
 */
function parseDocFunc (value) {
  return undefined;
}
