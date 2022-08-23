import JSON5 from 'json5-with-undefined';

/**
 * Attempts to parse the documentation default value information.
 *
 * If unsuccessful, will return 'undefined'.
 *
 * @param {object} defaultInfo - The documentation object containing default value data.
 * @returns {*} The parsed default value.
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
 *
 * @param {*} value - The value to stringify.
 * @returns {string} Stringified value.
 */
export function stringifyDocValue (value) {
  return JSON5.stringify(value);
}

/**
 * Parses a documentation value using the docgen format.
 *
 * @param {string} value - The value to parse.
 * @returns {*} The parsed value
 */
export function parseDocValue (value) {
  return JSON5.parse(value);
}

/**
 * Parses a documentation value from a function.
 *
 * TODO: Currently not implemented.
 *
 * @param {*} value - The unparsed documentation function string.
 * @returns {undefined} The parsed value.
 */
function parseDocFunc (value) {
  return undefined;
}
