<template>
  <div>
    <span>&lt;</span>
    <slot name="start" />
    <span class="dtc-fc-editor-element">{{ name }}</span>
    <slot name="end" />
    <span>&gt;</span>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  name: 'DtcCodeEditorTag',
};
</script>
