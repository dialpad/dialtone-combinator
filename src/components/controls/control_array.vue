<template>
  <div>
    <div>
      <slot />
    </div>
    <dtc-control-iterable
      :value="value"
      @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
    >
      <template #prefix>
        [
      </template>
      <template #default="{ item, update }">
        <dtc-control-dynamic
          :value="item"
          @update:value="update"
        />
      </template>
      <template #suffix>
        ]
      </template>
    </dtc-control-iterable>
  </div>
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
  args: {
    type: Object,
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
