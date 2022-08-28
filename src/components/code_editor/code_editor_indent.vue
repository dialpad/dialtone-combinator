<template>
  <span v-html="html" />
</template>

<script setup>
import { computed, inject } from 'vue';
import { SETTINGS_INDENT_KEY } from '@/src/lib/constants';

const props = defineProps({
  level: {
    type: Number,
    default: 2,
    validator (value) {
      return value > 0;
    },
  },
});

const html = computed(() => {
  return '&nbsp;'.repeat(props.level * inject(SETTINGS_INDENT_KEY).value);
});
</script>

<script>
export default {
  name: 'DtcCodeEditorIndent',
};
</script>
