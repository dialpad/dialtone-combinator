<template>
  <component
    :is="control"
    :label="label"
    :value="value"
    v-bind="args"
    @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
  />
</template>

<script setup>
import DtcControlEvent from './control_event.vue';
import DtcControlSlot from './control_slot.vue';
import DtcControlSelection from './control_selection.vue';
import DtcControlNumber from './control_number.vue';
import DtcControlString from './control_string.vue';
import DtcControlBoolean from './control_boolean.vue';
import DtcControlBase from './control_base.vue';

import { VALUE_UPDATE_EVENT } from '@/src/constants';
import { computed } from 'vue';
import { paramCase } from 'change-case';

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
  args: {
    type: Object,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const label = computed(() => {
  return paramCase(props.name);
});

const control = computed(() => {
  if (props.args.items && props.type === 'string') {
    return DtcControlSelection;
  }

  switch (props.type) {
    case 'event': return DtcControlEvent;
    case 'slot': return DtcControlSlot;
    case 'number': return DtcControlNumber;
    case 'string': return DtcControlString;
    case 'boolean': return DtcControlBoolean;
    default: return DtcControlBase;
  }
});
</script>

<script>
export default {
  name: 'DtcControl',
};
</script>
