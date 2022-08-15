<template>
  <dtc-control-string
    :value="value?.toString()"
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
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlBase',
};
</script>
