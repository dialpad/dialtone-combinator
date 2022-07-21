<template>
  <span>
    <dtc-code-editor-indent />
    <span
      class="dtc-code-editor-input d-ws-pre-wrap"
      spellcheck="false"
      contenteditable
      @input="e => emit('input', e)"
    >
      <slot />
    </span>
  </span>
</template>

<script setup>
import DtcCodeEditorIndent from './code_editor_indent';

const emit = defineEmits(['input']);
</script>

<script>
export default {
  name: 'DtcCodeEditorInput',
};
</script>

<style lang="less">
.dtc-code-editor-input {
  padding: var(--su2) var(--su4) var(--su2) var(--su4);
  border-radius: var(--su6);
  border: solid var(--su1);
  border-color: var(--dtc-theme-color-background-lighten);
  background-color: var(--dtc-theme-color-background-darken);
  outline: none;
}
</style>
