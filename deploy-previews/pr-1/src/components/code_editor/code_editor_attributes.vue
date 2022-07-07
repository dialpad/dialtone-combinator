<template>
  <span v-if="attributes">
    <template
      v-for="(value, key) in attributes"
      :key="key"
    >
      <span>&nbsp;</span>
      <span>{{ key }}="{{ value }}"</span>
    </template>
  </span>
</template>

<script setup>
defineProps({
  component: {
    type: Object,
  },
  attributes: {
    type: Object,
  },
});
</script>

<script>
export default {
  name: 'DtcCodeEditorTag',
};
</script>
