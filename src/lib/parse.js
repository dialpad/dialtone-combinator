export function parseJsonValue (value) {
  return JSON.parse(value.replaceAll('\'', '"'));
}
