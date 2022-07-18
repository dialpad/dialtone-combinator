<template>
  <dt-input
    :value="value"
    :label="name"
    class="d-r-none"
    type="textarea"
    spellcheck="false"
    @input="e => emit(VALUE_UPDATE_EVENT, e)"
  />
</template>

<script setup>
import { DtInput } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/constants';

defineProps({
  name: {
    type: String,
  },
  value: {
    type: String,
  },
});

const emit = defineEmits(['update:options']);
</script>

<script>
export default {
  name: 'DtcControlSlot',
};
</script>
