<template>
  <dt-input
    :label="name"
    size="sm"
    :value="value"
    type="number"
    @input="e => emit(VALUE_UPDATE_EVENT, parseInt(e))"
  />
</template>

<script setup>
import { DtInput } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/constants';

defineProps({
  name: {
    type: String,
  },
  value: {
    type: Number,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlNumber',
};
</script>
