<template>
  <span>
    <dtc-code-editor-tag>
      {{ tag }}
    </dtc-code-editor-tag>
    <slot />
    <dtc-code-editor-tag closing>
      {{ tag }}
    </dtc-code-editor-tag>
  </span>
</template>

<script setup>
import DtcCodeEditorTag from './code_editor_tag.vue';

defineProps({
  tag: {
    type: String,
  },
});
</script>

<script>
export default {
  name: 'DtcCodeEditorElement',
};
</script>
