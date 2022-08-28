<template>
  <div>
    <slot />
    <div data-qa="dtc-control-dynamic-selection">
      <dtc-control-selection
        :value="selectedControl"
        :valid-values="controlSelections"
        :disabled="disabled"
        @update:value="updateControl"
      />
    </div>
    <div
      class="d-ta-right d-ps-relative d-b1"
      data-qa="dtc-control-dynamic-value"
    >
      <component
        :is="controlComponent"
        v-if="controlComponent"
        :value="value"
        :disabled="disabled"
        @update:value="updateValue"
      />
    </div>
  </div>
</template>

<script setup>
import DtcControlSelection from './control_selection';

import { controlMap, getControlByValue, UNSET } from '@/src/lib/control';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed, ref } from 'vue';

const props = defineProps({
  value: {
    type: undefined,
    default: () => UNSET,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

/**
 * Controls from the 'control map' to include in selections.
 *
 * @type {Array}
 */
const externalControls = [
  'string',
  'number',
];

const controlSelectionMap = {
  ...Object.fromEntries(
    Object.entries(controlMap).filter(([controlName]) => {
      return externalControls.includes(controlName);
    }),
  ),
  true: {
    component: null,
    default () { return true; },
  },
  false: {
    component: null,
    default () { return false; },
  },
  null: {
    component: null,
    default () { return null; },
  },
  undefined: {
    component: null,
    default () { return UNSET; },
  },
};

const controlSelections = computed(() => Object.keys(controlSelectionMap));
const selectedControl = ref(getControl());

const controlComponent = computed(() => {
  return controlSelectionMap[selectedControl.value].component;
});

function getControl () {
  const value = props.value;

  switch (value) {
    case UNSET: return 'undefined';
    case null: return 'null';
    case false: return 'false';
    case true: return 'true';
  }

  const control = getControlByValue(value);

  return control === 'base'
    ? controlMap.dynamic.defaultControl()
    : control;
}

function updateControl (e) {
  selectedControl.value = e;
  updateValue(controlSelectionMap[e].default());
}

function updateValue (e) {
  emit(VALUE_UPDATE_EVENT, e);
}
</script>

<script>
/**
 * Control that is used to set a value from a variety of data types.
 */
export default {
  name: 'DtcControlDynamic',
};
</script>
