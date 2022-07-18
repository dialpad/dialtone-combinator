<template>
  <li>Event: {{ name }}</li>
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
</script>

<script>
export default {
  name: 'DtcControlEvent',
};
</script>
