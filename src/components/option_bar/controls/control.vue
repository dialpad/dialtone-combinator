<template>
  <component
    :is="control"
    :name="name"
    :value="value"
    @update:options="e => emit(OPTIONS_UPDATE_EVENT, e)"
  />
</template>
ß
<script setup>
import DtcControlBoolean from './control_boolean.vue';
import DtcControlString from './control_string.vue';
import DtcControlBase from './control_base.vue';

import { OPTIONS_UPDATE_EVENT } from '@/src/constants';
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
  },
  typeName: {
    type: String,
  },
  value: {
    type: String,
  },
});

const control = computed(() => {
  switch (props.typeName) {
    case 'boolean': return DtcControlBoolean;
    case 'string': return DtcControlString;
    default: return DtcControlBase;
  }
});

const emit = defineEmits([OPTIONS_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControl',
};
</script>
