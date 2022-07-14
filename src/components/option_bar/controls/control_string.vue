<template>
  <div>String: {{ name }}</div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
  },
  value: {
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
