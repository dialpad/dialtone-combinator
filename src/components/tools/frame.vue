<template>
  <iframe
    :title="title"
    class="dtc-frame"
  />
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
});

</script>

<script>
export default {
  name: 'DtcFrame',
};
</script>

<style>
  .dtc-frame {
    background-color: transparent;
    border: initial;
  }
</style>
