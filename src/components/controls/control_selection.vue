<template>
  <dt-select-menu
    label-class="d-fw-normal d-mb0"
    :value="value"
    :options="options"
    size="xs"
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
  labelGenerator: {
    type: Function,
    default: (value) => value.toString(),
  },
  args: {
    type: Object,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const options = computed(() => {
  return props.selections.map(selection => {
    return { value: selection, label: props.labelGenerator(selection) };
  });
});
</script>

<script>
export default {
  name: 'DtcControlSelection',
};
</script>
