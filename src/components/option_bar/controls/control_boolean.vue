<template>
  <dt-checkbox
    :checked="value"
    @input="e => emit(VALUE_UPDATE_EVENT, e)"
  >
    {{ name }}
  </dt-checkbox>
</template>

<script setup>
import { DtCheckbox } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/constants';

defineProps({
  name: {
    type: String,
  },
  value: {
    type: Boolean,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlBoolean',
};
</script>
