<template>
  <dt-input
    :value="value"
    :label="label"
    class="d-r-none"
    type="textarea"
    spellcheck="false"
    @input="e => emit(VALUE_UPDATE_EVENT, e)"
  />
</template>

<script setup>
import { DtInput } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlSlot',
};
</script>
