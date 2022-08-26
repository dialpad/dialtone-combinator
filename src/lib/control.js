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

import { typeOfMemberValue } from '@/src/lib/utils';

/**
 * Symbol representing a value that is "not set".
 * The main usage is to indicate that a prop value should be 'undefined' instead of using its default value.
 *
 * @type {symbol}
 */
export const UNSET = Symbol('unset');

/**
 * Map of controls containing control component and related information.
 * Controls must have the 'component(args)' and `get default()` fields.
 *
 * @type {object}
 */
export const controlMap = Object.freeze({
  event: () => {
    return {
      component: DtcControlEvent,
      get default () { return null; },
    };
  },
  slot: () => {
    return {
      component: DtcControlSlot,
      get default () { return this.component.props.value.default(); },
    };
  },
  dynamic: () => {
    return {
      component: DtcControlDynamic,
      get default () { return this.component.props.value.default(); },
      get defaultControl () { return 'undefined'; },
      serialize: true,
    };
  },
  object: function () {
    return {
      component: DtcControlObject,
      get default () { return this.component.props.value.default(); },
    };
  },
  array: () => {
    return {
      component: DtcControlArray,
      get default () { return this.component.props.value.default(); },
    };
  },
  selection: ({ defaultValue } = {}) => {
    return {
      component: DtcControlSelection,
      get default () { return defaultValue; },
    };
  },
  string: () => {
    return {
      component: DtcControlString,
      get default () { return this.component.props.value.default(); },
    };
  },
  number: () => {
    return {
      component: DtcControlNumber,
      get default () { return this.component.props.value.default(); },
    };
  },
  boolean: () => {
    return {
      component: DtcControlBoolean,
      get default () { return this.component.props.value.default(); },
    };
  },
  null: () => {
    return {
      component: DtcControlNull,
      get default () { return this.component.props.value.default(); },
      serialize: true,
    };
  },
  base: () => {
    return {
      component: DtcControlBase,
      get default () { return this.component.props.value.default(); },
    };
  },
});

export function getControlByValue (value) {
  const control = value === undefined || value === null || value === UNSET
    ? 'null'
    : typeOfMemberValue(value);

  return control in controlMap
    ? control
    : 'base';
}

export function getControlByMemberType (type, args) {
  switch (type) {
    case 'string': {
      return args?.values && args.values.length > 0
        ? 'selection'
        : 'string';
    }
    default: return type;
  }
}

/**
 * Serializes a value before giving it to a control that requires a serialized value.
 * Currently, this only converts between 'UNSET' and 'undefined'.
 *
 * @param {*} value - The value to serialize
 * @returns {*} The serialized value
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
 * @param {*} value - The value to deserialize
 * @returns {*} The deserialized value
 */
export function deserializeControlValue (value) {
  return value === UNSET
    ? undefined
    : value;
}
