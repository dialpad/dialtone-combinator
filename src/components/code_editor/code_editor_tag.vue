<template>
  <div>
    <div>
      <span>&lt;</span>
      <span v-if="closing">/</span>
      <slot />
      <span
        v-if="closing"
      >&gt;
      </span>
    </div>
    <span
      v-if="!closing"
    >&gt;
    </span>
  </div>
</template>

<script setup>
defineProps({
  closing: {
    type: Boolean,
  },
});
</script>

<script>
export default {
  name: 'DtcCodeEditorAttributes',
};
</script>
