export function parseJsonValue (value) {
  return JSON.parse(value.replaceAll('\'', '"'));
}

export function parseAttributeTag (value) {
  // eslint-disable-next-line no-unused-vars
  const [_, type, name] = /{(.+)}(.+)*/.exec(value);
  return [
    name.trim().toLowerCase(),
    type.trim().toLowerCase(),
  ];
}
