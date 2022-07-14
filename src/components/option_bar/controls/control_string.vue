<template>
  <div>String: {{ name }}</div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
  },
  defaultValue: {
    type: String,
  },
});

defineEmits(['update:options']);
</script>

<script>
export default {
  name: 'DtcControlString',
};
</script>
