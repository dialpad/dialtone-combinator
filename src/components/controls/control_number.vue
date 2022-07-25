<template>
  <dt-input
    :value="value"
    type="number"
    size="sm"
    @input="e => emit(VALUE_UPDATE_EVENT, parseInt(e))"
  >
    <template #labelSlot>
      <slot />
    </template>
  </dt-input>
</template>

<script setup>
import { DtInput } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  value: {
    type: Number,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlNumber',
};
</script>
