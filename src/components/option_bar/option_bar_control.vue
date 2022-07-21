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
import DtcControlDirective from '@/src/components/controls/control_directive';
import DtcControlEvent from '@/src/components/controls/control_event';
import DtcControlSlot from '@/src/components/controls/control_slot';
import DtcControlSelection from '@/src/components/controls/control_selection';
import DtcControlNumber from '@/src/components/controls/control_number';
import DtcControlString from '@/src/components/controls/control_string';
import DtcControlBoolean from '@/src/components/controls/control_boolean';
import DtcControlBase from '@/src/components/controls/control_base';

import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed, onMounted } from 'vue';
import { paramCase } from 'change-case';

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: undefined,
    default: undefined,
  },
  args: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const label = computed(() => {
  return paramCase(props.name);
});

const control = computed(() => {
  if (props.type === 'boolean') {
    return DtcControlBoolean;
  }

  if (props.args.validValues) {
    return DtcControlSelection;
  }

  switch (props.type) {
    case 'directive': return DtcControlDirective;
    case 'event': return DtcControlEvent;
    case 'slot': return DtcControlSlot;
    case 'number': return DtcControlNumber;
    case 'string': return DtcControlString;
    default: return DtcControlBase;
  }
});

onMounted(() => {
  emit(VALUE_UPDATE_EVENT, props.value);
});
</script>

<script>
export default {
  name: 'DtcControl',
};
</script>
