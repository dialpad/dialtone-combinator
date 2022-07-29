export function parseDocDefault (defaultInfo) {
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
