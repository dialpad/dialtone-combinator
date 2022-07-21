<template>
  <dt-checkbox
    label-class="dtc-control-boolean"
    :checked="value"
    @input="e => emit(VALUE_UPDATE_EVENT, e)"
  >
    {{ label }}
  </dt-checkbox>
</template>

<script setup>
import { DtCheckbox } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Boolean,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcControlBoolean',
};
</script>

<style>
.dtc-control-boolean {
  color: var(--base--text-color);
  font-size: var(--base--font-size);
}
</style>
