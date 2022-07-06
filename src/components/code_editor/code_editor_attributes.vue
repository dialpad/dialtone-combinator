<template>
  <span v-if="componentProps">
    <template
      v-for="(value, key) in componentProps"
      :key="key"
    >
      <span>&nbsp;</span>
      <span>
        <span>{{ key }}</span>
        <span>=</span>
        <span>"</span>
        <span>{{ value }}</span>
        <span>"</span>
      </span>
    </template>
  </span>
</template>

<script setup>
const props = defineProps({
  component: {
    type: Object,
  },
  componentProps: {
    type: Object,
  },
});

console.log(props);
</script>

<script>
export default {
  name: 'DtcCodeEditorTag',
};
</script>
