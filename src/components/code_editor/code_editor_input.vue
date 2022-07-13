<template>
  <span>
    <dtc-code-editor-indent />
    <span
      class="dtc-code-editor-editable"
      spellcheck="false"
      contenteditable
      @input="e => emit('input', e)"
    >
      <slot />
    </span>
  </span>
</template>

<script setup>
import DtcCodeEditorIndent from './code_editor_indent.vue';

defineProps({
  closing: {
    type: Boolean,
  },
});

const emit = defineEmits(['input']);
</script>

<script>
export default {
  name: 'DtcCodeEditorInput',
};
</script>
