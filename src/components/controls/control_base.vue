<template>
  <dtc-control-string
    :value="value?.toString()"
    :disabled="disabled"
    @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
  >
    <slot />
  </dtc-control-string>
</template>

<script setup>
import DtcControlString from './control_string';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { controlMap } from '@/src/lib/control';

defineProps({
  value: {
    type: undefined,
    default: () => controlMap.base.default,
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
 * Control that is used when no other controls are valid.
 */
export default {
  name: 'DtcControlBase',
};
</script>
