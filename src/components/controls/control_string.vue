<template>
  <dt-input
    size="sm"
    :label="label"
    :value="value"
    @input="e => emit(VALUE_UPDATE_EVENT, e)"
  />
</template>

<script setup>
import { DtInput } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlString',
};
</script>
