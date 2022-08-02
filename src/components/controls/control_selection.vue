<template>
  <dt-select-menu
    label-class="d-fw-normal d-mb0"
    :value="value"
    :options="options"
    size="sm"
    @input="e => emit(VALUE_UPDATE_EVENT, e)"
  >
    <template #label>
      <slot />
    </template>
  </dt-select-menu>
</template>

<script setup>
import { DtSelectMenu } from '@dialpad/dialtone-vue';

import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: undefined,
    default: undefined,
  },
  selections: {
    type: Array,
    default: undefined,
  },
  generateLabel: {
    type: Function,
    default: (value) => value.toString(),
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const options = computed(() => {
  return props.selections.map(selection => {
    return { value: selection, label: props.generateLabel(selection) };
  });
});
</script>

<script>
export default {
  name: 'DtcControlSelection',
};
</script>
