<template>
  <li>Directive: {{ label }}</li>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
});
</script>

<script>
export default {
  name: 'DtcControlDirective',
};
</script>
