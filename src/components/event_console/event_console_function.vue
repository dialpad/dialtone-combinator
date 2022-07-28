<template>
  <span>
    <span class="dtc-scheme__function">function</span>
    <span>()</span>
  </span>
</template>

<script setup>
defineProps({
  value: {
    type: Function,
    required: true,
  },
});
</script>

<script>
export default {
  name: 'DtcEventConsoleFunction',
};
</script>
