<template>
  <span
    v-html="'&nbsp;'.repeat(spaces)"
  />
</template>

<script setup>
defineProps({
  spaces: {
    type: Number,
    default: 2,
  },
});
</script>

<script>
export default {
  name: 'DtcCodeEditorIndent',
};
</script>
