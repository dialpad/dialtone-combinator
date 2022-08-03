<template>
  <div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  value: {
    type: undefined,
    default: undefined,
  },
});
</script>

<script>
export default {
  name: 'DtcControlEvent',
};
</script>
