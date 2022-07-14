<template>
  <dtc-control-string
    :name="name"
    :value="value"
    @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
  />
</template>

<script setup>
import DtcControlString from './control_string.vue';
import { VALUE_UPDATE_EVENT } from '@/src/constants';

defineProps({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlBase',
};
</script>
