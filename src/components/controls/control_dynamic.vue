<template>
  <div>
    <div>
      <dtc-control-selection
        :value="selectedControlName"
        :selections="controlSelections"
        @update:value="updateControlName"
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

const validSelections = [
  'null',
  'string',
  'number',
  'boolean',
];

const controlSelectionMap = {
  null: {
    control: () => null,
    default: () => null,
  },
  ...Object.fromEntries(
    Object.entries(controlMap).filter(([controlName]) => {
      return validSelections.includes(controlName);
    }),
  ),
};

const controlSelections = computed(() => Object.keys(controlSelectionMap));
const selectedControlName = ref(
  props.value
    ? typeof props.value
    : 'null',
);

const control = computed(() => {
  return controlSelectionMap[selectedControlName.value].component();
});

function updateControlName (e) {
  selectedControlName.value = e;
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
