import { parseDocValue, stringifyDocValue } from '@/src/lib/parse';

const convertMap = {
  object: {
    array: objectToArray,
    string: stringifyDocValue,
  },
  array: {
    object: arrayToObject,
    string: stringifyDocValue,
  },
  string: {
    object: parseDocValue,
    array: parseDocValue,
  },
};

export function convert (from, to, value) {
  return convertMap[from]?.[to]?.(value);
}

function objectToArray (object) {
  return Object.values(object);
}

function arrayToObject (array) {
  console.log(array);
  return {
    ...array,
  };
}
