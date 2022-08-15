/**
 * See /.github/documentation/internal/CONTROLS.MD
 * For in-depth information about controls.
 */
import DtcControlEvent from '@/src/components/controls/control_event';
import DtcControlSlot from '@/src/components/controls/control_slot';
import DtcControlDynamic from '@/src/components/controls/control_dynamic';
import DtcControlObject from '@/src/components/controls/control_object';
import DtcControlArray from '@/src/components/controls/control_array';
import DtcControlBoolean from '@/src/components/controls/control_boolean';
import DtcControlNumber from '@/src/components/controls/control_number';
import DtcControlSelection from '@/src/components/controls/control_selection';
import DtcControlString from '@/src/components/controls/control_string';
import DtcControlNull from '@/src/components/controls/control_null';
import DtcControlBase from '@/src/components/controls/control_base';

import { typeOfMember } from '@/src/lib/utils';

/**
 * Symbol representing a value that is "not set".
 * The main usage is to indicate that a prop value should be 'undefined' instead of using its default value.
 *
 * @type {Symbol}
 */
export const UNSET = Symbol('unset');

/**
 * Map of controls containing control component and related information.
 * Controls must have the 'component(args)' and `get default()` fields.
 *
 * @type {Object}
 */
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
    component: (args) => {
      return args?.validValues
        ? DtcControlSelection
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

/**
 * Gets the component for a control given the args
 * If no control is found the base control component is returned.
 *
 * @param control The control in `controlMap`.
 * @param args The control args.
 * @returns {Object}
 */
export function getControlComponent (control, args) {
  return controlMap[control]?.component(args) ?? controlMap.base.component(args);
}

export function getControlByValue (value) {
  const control = value === undefined || value === null || value === UNSET
    ? 'null'
    : typeOfMember(value);

  return control in controlMap
    ? control
    : 'base';
}

/**
 * Serializes a value before giving it to a control that requires a serialized value.
 * Currently, this only converts between 'UNSET' and 'undefined'.
 *
 * @returns {*}
 */
export function serializeControlValue (value) {
  return value === undefined
    ? UNSET
    : value;
}

/**
 * Deserializes a value after receiving it from a control that requires a serialized value.
 * Currently, this only converts between 'UNSET' and 'undefined'.
 *
 * @returns {*}
 */
export function deserializeControlValue (value) {
  return value === UNSET
    ? undefined
    : value;
}
