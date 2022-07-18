<template>
  <component
    :is="control"
    :name="name"
    :value="value"
    @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
  />
</template>

<script setup>
import DtcControlSlot from './control_slot.vue';
import DtcControlBoolean from './control_boolean.vue';
import DtcControlString from './control_string.vue';
import DtcControlBase from './control_base.vue';

import { VALUE_UPDATE_EVENT } from '@/src/constants';
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
  },
  value: {
    type: undefined,
  },
  controlName: {
    type: String,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const control = computed(() => {
  switch (props.controlName) {
    case 'slot': return DtcControlSlot;
    case 'boolean': return DtcControlBoolean;
    case 'string': return DtcControlString;
    default: return DtcControlBase;
  }
});
</script>

<script>
export default {
  name: 'DtcControl',
};
</script>
