export function parseDocDefault (defaultInfo) {
  if (!defaultInfo.value) { return defaultInfo.value; }
  return defaultInfo.func
    ? parseDocFunc(defaultInfo.value)
    : parseDocValue(defaultInfo.value);
}

export function parseDocValue (value) {
  return JSON.parse(value.replaceAll('\'', '"'));
}

// TODO: Properly set default value from func
function parseDocFunc () {
  return null;
}

export function stringifyDocValue (value) {
  return JSON.stringify(value, null, 2).replaceAll('"', '\'');
}
