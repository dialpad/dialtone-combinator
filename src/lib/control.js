import DtcControlEvent from '@/src/components/controls/control_event';
import DtcControlSlot from '@/src/components/controls/control_slot';
import DtcControlDynamic from '@/src/components/controls/control_dynamic';
import DtcControlObject from '@/src/components/controls/control_object';
import DtcControlArray from '@/src/components/controls/control_array';
import DtcControlBoolean from '@/src/components/controls/control_boolean';
import DtcControlNumber from '@/src/components/controls/control_number';
import DtcControlCombo from '@/src/components/controls/control_combo';
import DtcControlString from '@/src/components/controls/control_string';
import DtcControlNull from '@/src/components/controls/control_null';
import DtcControlBase from '@/src/components/controls/control_base';

import { typeOfMember, UNSET } from '@/src/lib/utils';

export const controlMap = Object.freeze({
  event: {
    component: () => DtcControlEvent,
    get default () { return null; },
    important: true,
  },
  slot: {
    component: () => DtcControlSlot,
    get default () { return null; },
    important: true,
  },
  dynamic: {
    component: () => DtcControlDynamic,
    get default () { return UNSET; },
    get defaultControl () { return 'undefined'; },
    serialize: true,
  },
  object: {
    component: () => DtcControlObject,
    get default () { return {}; },
  },
  array: {
    component: () => DtcControlArray,
    get default () { return []; },
  },
  string: {
    component: ({ validValues } = {}) => {
      return validValues
        ? DtcControlCombo
        : DtcControlString;
    },
    get default () { return String(); },
  },
  number: {
    component: () => DtcControlNumber,
    get default () { return Number(); },
  },
  boolean: {
    component: () => DtcControlBoolean,
    get default () { return Boolean(); },
  },
  null: {
    component: () => DtcControlNull,
    get default () { return null; },
    serialize: true,
  },
  base: {
    component: () => DtcControlBase,
    get default () { return null; },
  },
});

export function getControlComponent (name, args) {
  return controlMap[name]?.component(args) ?? controlMap.base.component(args);
}

export function getControlByValue (value) {
  const control = value === undefined || value === null || value === UNSET
    ? 'null'
    : typeOfMember(value);

  return control in controlMap
    ? control
    : 'base';
}

export function serializeControlValue (value) {
  return value === undefined
    ? UNSET
    : value;
}

export function deserializeControlValue (value) {
  return value === UNSET
    ? undefined
    : value;
}
