<template>
  <span
    v-html="html"
  />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  spaces: {
    type: Number,
    default: 2,
    validator (value) {
      return value > 0;
    },
  },
});

const html = computed(() => {
  return '&nbsp;'.repeat(props.spaces);
});
</script>

<script>
export default {
  name: 'DtcCodeEditorIndent',
};
</script>
