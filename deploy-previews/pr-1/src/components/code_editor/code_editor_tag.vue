<template>
  <span>
    <span>&lt;</span>
    <span v-if="closing">/</span>
    <slot />
    <span>&gt;</span>
  </span>
</template>

<script setup>
defineProps({
  closing: {
    type: Boolean,
  },
});
</script>

<script>
export default {
  name: 'DtcCodeEditorAttributes',
};
</script>
