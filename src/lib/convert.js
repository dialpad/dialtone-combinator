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
    number: parseInt,
    boolean: stringToBoolean,
  },
  number: {
    string: numberToString,
    boolean: numberToBoolean,
  },
  boolean: {
    string: booleanToString,
    number: booleanToNumber,
  },
};

export function convert (from, to, value) {
  return convertMap[from]?.[to]?.(value);
}

function objectToArray (object) {
  return Object.values(object);
}

function arrayToObject (array) {
  return {
    ...array,
  };
}

function stringToBoolean (string) {
  return string === 'true';
}

function numberToString (number) {
  return number
    ? number.toString()
    : null;
}

function numberToBoolean (number) {
  return number === 1;
}

function booleanToString (boolean) {
  return boolean ? 'true' : 'false';
}

function booleanToNumber (boolean) {
  return boolean ? 1 : 0;
}
