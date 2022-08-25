import { parseDocDefault } from '@/src/lib/parse';
import { typeOfMember } from '@/src/lib/utils';
import { paramCase, sentenceCase } from 'change-case';

/**
 * The default processing function that is applied to every member in a member group.
 *
 * Sets a predetermined default value and default type for a member.
 * Also adds a getter for a label value.
 *
 * @param {object} member - The extended member.
 */
export function extendMember (member) {
  let defaultValue = member.defaultValue
    ? parseDocDefault(member.defaultValue)
    : undefined;

  let defaultType;
  if (member.type?.name) {
    defaultType = typeOfMember(defaultValue);
    [defaultValue, defaultType] = extendMemberType(member, defaultValue, defaultType);
  }

  if (defaultValue !== undefined) {
    member.defaultValue = defaultValue;
  }
  if (defaultType !== undefined) {
    member.defaultType = defaultType;
  }
  if (member.name) {
    member.label = paramCase(member.name);
  }
  if (member.description) {
    member.description = sentenceCase(member.description);
  }
}

/**
 * Extends a member's types by extracting each entry in the type string
 * and adding each to an array.
 *
 * The default type is validated to ensure it is included in the
 * array of valid types.
 *
 * If it is not the default value and default type are set to 'undefined'
 *
 * @param {object} member - The member to extend.
 * @param {*} defaultValue - The default value of the member.
 * @param {string} defaultType - The default type of the member.
 * @returns {Array} The extended member.
 */
function extendMemberType (member, defaultValue, defaultType) {
  member.type.names = extractMemberTypes(member.type.name);
  delete member.type.name;

  if (
    defaultType !== undefined &&
    defaultType !== null &&
    !member.type.names.includes(defaultType)
  ) {
    defaultValue = undefined;
    defaultType = undefined;
  }

  return [defaultValue, defaultType];
}

/**
 * Splits a member type string into an array of type names.
 *
 * @param {string} typeString - The member type string.
 * @returns {Array} Array of types for member.
 */
function extractMemberTypes (typeString) {
  return typeString.split('|').map(type => type.trim().toLowerCase());
}

/**
 * Extends an event member.
 *
 * Event members use the custom 'type' tag so their type data
 * is stored differently than other members.
 *
 * This corrects the type data to the same format.
 *
 * @param {object} event - The event member.
 */
export function extendEvent (event) {
  const types = event.type?.names?.[0];
  if (types) {
    event.type.names = extractMemberTypes(types);
  }
}
