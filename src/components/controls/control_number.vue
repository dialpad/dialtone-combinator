<template>
  <dt-input
    :value="value"
    :disabled="disabled"
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
import { controlMap } from '@/src/lib/control';

defineProps({
  value: {
    type: Number,
    default: () => controlMap.number.default,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
/**
 * Control that is used to set 'number' value.
 */
export default {
  name: 'DtcControlNumber',
};
</script>
