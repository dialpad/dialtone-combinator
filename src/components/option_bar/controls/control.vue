<template>
  <component
    :is="control"
    :name="name"
    :value="value"
    @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
  />
</template>

<script setup>
import DtcControlEvent from './control_event.vue';
import DtcControlSlot from './control_slot.vue';
import DtcControlBoolean from './control_boolean.vue';
import DtcControlString from './control_string.vue';
import DtcControlBase from './control_base.vue';

import { VALUE_UPDATE_EVENT } from '@/src/constants';
import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
  },
  name: {
    type: String,
  },
  value: {
    type: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const control = computed(() => {
  switch (props.type) {
    case 'event': return DtcControlEvent;
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
