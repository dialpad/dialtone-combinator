import { parse, stringify } from 'json5-with-undefined';

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

export function stringifyDocValue (value) {
  return stringify(value);
}

export function parseDocValue (value) {
  return parse(value);
}

// TODO: Properly set default value from func
function parseDocFunc () {
  return undefined;
}
