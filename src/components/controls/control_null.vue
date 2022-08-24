<template>
  <dtc-control-selection
    :value="selection"
    :valid-values="selections"
    @update:value="updateValue"
  >
    <slot />
  </dtc-control-selection>
</template>

<script setup>
import DtcControlSelection from './control_selection';
import { computed } from 'vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { controlMap, UNSET } from '@/src/lib/control';

const props = defineProps({
  value: {
    type: undefined,
    default: () => controlMap.null.default,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const selectionMap = {
  undefined: UNSET,
  null: null,
  NaN,
};

const selections = computed(() => {
  return Object.keys(selectionMap);
});

const selection = computed(() => {
  return Object.keys(selectionMap).find(selection => {
    return Object.is(props.value, selectionMap[selection]);
  });
});

function updateValue (e) {
  emit(VALUE_UPDATE_EVENT, selectionMap[e]);
}
</script>

<script>
/**
 * Control that is used to set nullish values.
 */
export default {
  name: 'DtcControlNull',
};
</script>
