<template>
  <div>
    <div>
      <dtc-control-selection
        :value="selectedControl"
        :valid-values="controlSelections"
        @update:value="updateControl"
      />
    </div>
    <div class="d-ta-right">
      <component
        :is="control"
        v-if="control"
        :value="value"
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
    default: () => controlMap.dynamic.default,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

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
    component: () => null,
    get default () { return true; },
  },
  false: {
    component: () => null,
    get default () { return false; },
  },
  NaN: {
    component: () => null,
    get default () { return NaN; },
  },
  null: {
    component: () => null,
    get default () { return null; },
  },
  undefined: {
    component: () => null,
    get default () { return UNSET; },
  },
};

const controlSelections = computed(() => Object.keys(controlSelectionMap));
const selectedControl = ref(getControl());

const control = computed(() => {
  return controlSelectionMap[selectedControl.value]?.component();
});

function getControl () {
  const value = props.value;

  switch (value) {
    case UNSET: return 'undefined';
    case null: return 'null';
    case false: return 'false';
    case true: return 'true';
  }

  if (Number.isNaN(value)) { return 'NaN'; }

  const control = getControlByValue(value);

  return control === 'base'
    ? controlMap.dynamic.defaultControl
    : control;
}

function updateControl (e) {
  selectedControl.value = e;
  updateValue(controlSelectionMap[e].default);
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
