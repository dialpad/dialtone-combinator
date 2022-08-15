import documentation from '@/src/assets/component-documentation.json';

import { parseDocDefault, stringifyDocValue } from '@/src/lib/parse';
import { typeOfMember } from '@/src/lib/utils';
import { controlMap } from '@/src/lib/control';
import { paramCase } from 'change-case';

export function getComponentInfo (component) {
  const info = {
    ...documentation.find(componentInfo => componentInfo.displayName === component.name),
  };

  const defaults = extendInfo(info);
  return [info, defaults];
}

function extendInfo (info) {
  renameModelProp(info);

  const defaults = {};

  if (info.slots) {
    info.slots = processMembers(info.slots);
    defaults.slots = getDefaults(info.slots);
  }

  if (info.props) {
    info.props = processMembers(info.props);
    defaults.props = getDefaults(info.props);
  }

  const attributes = getAttributes(info);
  if (attributes) {
    info.attributes = processMembers(attributes);
    defaults.attributes = getDefaults(info.attributes);
  }

  if (info.events) {
    info.events = processMembers(info.events, extendEvent);
  }

  return defaults;
}

function getAttributes (info) {
  const properties = info.tags.property;

  if (!properties) {
    return null;
  }

  return properties.filter(property => {
    return property.description === 'attribute';
  }).map(property => {
    const type = property.type.name.toLowerCase();
    return {
      name: property.name,
      type: {
        name: type,
      },
      defaultValue: {
        value: stringifyDocValue(controlMap[type].default),
      },
    };
  });
}

function getDefaults (members) {
  return Object.fromEntries(members.map(member => [member.name, member.defaultValue]));
}

function renameModelProp (info) {
  const model = info.props.find(componentProp => {
    const tags = componentProp.tags;
    return tags
      ? 'model' in tags
      : false;
  });
  if (model) {
    model.name = model.tags.model[0]?.description;
  }
}

function processMembers (members, ...processors) {
  return members?.map(member => {
    extendMember(member);
    processors.forEach(processor => {
      processor(member);
    });
    return member;
  });
}

function extendEvent (event) {
  const types = event.type?.names?.[0];
  if (types) {
    event.type.names = extractMemberTypes(types);
  }
}

function extendMember (member) {
  let defaultValue = member.defaultValue
    ? parseDocDefault(member.defaultValue)
    : undefined;

  let defaultType;
  if (member.type?.name) {
    defaultType = typeOfMember(defaultValue);
    [defaultValue, defaultType] = extendMemberType(member, defaultValue, defaultType);
  }

  if (defaultValue !== undefined) { member.defaultValue = defaultValue; }
  if (defaultType !== undefined) { member.defaultType = defaultType; }
  if (member.name) {
    member.getLabel = function () {
      return paramCase(member.name);
    };
  }
}

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

function extractMemberTypes (typeString) {
  return typeString.split('|').map(type => type.trim().toLowerCase());
}
