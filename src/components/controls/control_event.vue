<template>
  <li>Event: {{ label }}</li>
</template>

<script setup>
defineProps({
  label: {
    type: String,
  },
  value: {
    type: String,
  },
});
</script>

<script>
export default {
  name: 'DtcControlEvent',
};
</script>
