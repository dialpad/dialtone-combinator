export function parseDocDefault (defaultInfo) {
  if (!defaultInfo.value) { return defaultInfo.value; }
  return defaultInfo.func
    ? parseDocFunc(defaultInfo.value)
    : parseDocValue(defaultInfo.value);
}

function parseDocValue (value) {
  return JSON.parse(value.replaceAll('\'', '"'));
}

// TODO: IDK better way to do this rn?
function parseDocFunc (value) {
  // eslint-disable-next-line no-eval
  return eval(`(${value})`)();
}

export function stringifyDocValue (value) {
  return JSON.stringify(value, null, 2).replaceAll('"', '\'');
}
