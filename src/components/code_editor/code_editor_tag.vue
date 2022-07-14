<template>
  <div>
    <span>&lt;</span>
    <span v-if="type === 'closing'">/</span>
    <slot />
    <span v-if="type === 'self-closing'">/</span>
    <span>&gt;</span>
  </div>
</template>

<script setup>
import { CODE_EDITOR_TAG_TYPES } from '@/src/constants';

defineProps({
  type: {
    type: String,
    default: () => CODE_EDITOR_TAG_TYPES[0],
    validator (value) {
      return CODE_EDITOR_TAG_TYPES.includes(value);
    },
  },
});
</script>

<script>
export default {
  name: 'DtcCodeEditorTag',
};
</script>
