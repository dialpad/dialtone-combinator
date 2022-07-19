<template>
  <dtc-control-string
    :label="label"
    :value="value"
    v-bind="args"
    @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
  />
</template>

<script setup>
import DtcControlString from './control_string.vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
  args: {
    type: Object,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlBase',
};
</script>
