<template>
  <dtc-control-iterable
    :value="value"
    @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
  >
    <template #default>
      <slot />
    </template>
    <template #prefix>
      [
    </template>
    <template #item="{ item, update }">
      <dtc-control-dynamic
        :value="item"
        @update:value="update"
      />
    </template>
    <template #suffix>
      ]
    </template>
  </dtc-control-iterable>
</template>

<script setup>
import DtcControlIterable from './control_iterable';
import DtcControlDynamic from './control_dynamic';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  value: {
    type: Array,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlArray',
};
</script>
