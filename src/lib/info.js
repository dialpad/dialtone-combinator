import internalDocumentation from '@/src/assets/component-documentation.json';
import externalDocumentation from '@dialpad/dialtone-vue/dist/component-documentation.json';

import { parseDocDefault, stringifyDocValue } from '@/src/lib/parse';
import { typeOfMember } from '@/src/lib/utils';
import { controlMap } from '@/src/lib/control';

const documentation = internalDocumentation ?? externalDocumentation;

export function getComponentInfo (component) {
  const info = {
    ...documentation.find(componentInfo => componentInfo.displayName === component.name),
  };

  console.log(info);
  const defaults = extendInfo(info);
  return [info, defaults];
}

function extendInfo (info) {
  renameModelProp(info);

  const defaults = {};

  if (info.slots) {
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
    defaults.events = getDefaults(info.events);
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
    const type = property.type.name;
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

function processMembers (members) {
  return members?.map(member => {
    extendMember(member);
    return member;
  });
}

function extendMember (member) {
  if (member.type) {
    member.types = extractMemberTypes(member.type.name);
    delete member.type;
  }

  let defaultValue = member.defaultValue
    ? parseDocDefault(member.defaultValue)
    : undefined;

  let defaultType = typeOfMember(defaultValue);
  if (defaultType != null && !member.types.includes(defaultType)) {
    defaultValue = undefined;
    defaultType = undefined;
  }

  member.defaultValue = defaultValue;
  member.defaultType = defaultType;
}

function extractMemberTypes (typeString) {
  return typeString.split('|').map(type => type.trim());
}
