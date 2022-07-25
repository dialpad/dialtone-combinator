<template>
  <dtc-control-string
    :label="label"
    :value="value?.toString()"
    v-bind="args"
    @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
  />
</template>

<script setup>
import DtcControlString from './control_string';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  label: {
    type: String,
    required: true,
  },
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
</script>

<script>
export default {
  name: 'DtcControlBase',
};
</script>
