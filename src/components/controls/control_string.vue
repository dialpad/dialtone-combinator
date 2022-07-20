<template>
  <dt-input
    :value="value"
    size="sm"
    @input="e => emit(VALUE_UPDATE_EVENT, e)"
  >
    <template #labelSlot>
      {{ label }}
    </template>
    <template #rightIcon>
      <slot name="icon" />
    </template>
  </dt-input>
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
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlString',
};
</script>
