<template>
  <div>
    <div>
      <dtc-control-selection
        :value="selectedControl"
        :selections="controlSelections"
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

import { controlMap } from '@/src/lib/utils_control';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed, ref } from 'vue';

const props = defineProps({
  value: {
    type: undefined,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const externalControls = [
  'string',
  'number',
];

const controlSelectionMap = {
  null: {
    component: () => null,
    get default () { return null; },
  },
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
};

const controlSelections = computed(() => Object.keys(controlSelectionMap));
const selectedControl = ref(
  props.value
    ? typeof props.value
    : 'null',
);

const control = computed(() => {
  return controlSelectionMap[selectedControl.value]?.component();
});

function updateControl (e) {
  selectedControl.value = e;
  updateValue(controlSelectionMap[e].default);
}

function updateValue (e) {
  emit(VALUE_UPDATE_EVENT, e);
}
</script>

<script>
export default {
  name: 'DtcControlDynamic',
};
</script>
