<template>
  <dt-checkbox
    :checked="value === 'true'"
    @input="e => emit(OPTIONS_UPDATE_EVENT, options => {
      options.props[name] = e;
    })"
  >
    {{ name }}
  </dt-checkbox>
</template>

<script setup>
import { DtCheckbox } from '@dialpad/dialtone-vue';

import { OPTIONS_UPDATE_EVENT } from '@/src/constants';

defineProps({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});

const emit = defineEmits([OPTIONS_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlBoolean',
};
</script>
