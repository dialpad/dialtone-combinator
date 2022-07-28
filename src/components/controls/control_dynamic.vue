<template>
  <div>
    <div>
      <dtc-control-selection
        :value="selectedControlType"
        :selections="controlSelections"
        @update:value="updateControlType"
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
import DtcControlBoolean from './control_boolean';
import DtcControlNumber from './control_number';
import DtcControlString from './control_string';

import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed, ref } from 'vue';

const props = defineProps({
  value: {
    type: undefined,
    default: undefined,
  },
  args: {
    type: Object,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const controlMap = {
  null: {
    control: null,
    default: null,
  },
  string: {
    control: DtcControlString,
    default: String(),
  },
  number: {
    control: DtcControlNumber,
    default: Number(),
  },
  boolean: {
    control: DtcControlBoolean,
    default: Boolean(),
  },
};

const controlSelections = computed(() => Object.keys(controlMap));
const selectedControlType = ref(
  props.value
    ? typeof props.value
    : 'null',
);

const control = computed(() => {
  return controlMap[selectedControlType.value].control;
});

function updateControlType (e) {
  selectedControlType.value = e;
  updateValue(controlMap[e].default);
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
