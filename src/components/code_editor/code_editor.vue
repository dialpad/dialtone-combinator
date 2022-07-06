<template>
  <div class="dtc-code-editor">
    <dtc-code-editor-element :tag="tag">
      <span>Poggers</span>
    </dtc-code-editor-element>
  </div>
</template>

<script setup>
import { paramCase } from 'change-case';
import { computed } from 'vue';

import DtcCodeEditorElement from './code_editor_element.vue';

const props = defineProps({
  component: {
    type: Object,
  },
  options: {
    type: Object,
  },
});

const tag = computed(() => paramCase(props.component.name));
</script>

<script>
export default {
  name: 'DtcCodeEditor',
};
</script>

<style>
.dtc-code-editor {
  padding: var(--su16);
  color: white;
  background-color: hsla(var(--black-600-h) var(--black-600-s) var(--black-600-l) ' / ' var(--bgo));
  overflow: hidden;
}

.dtc-code-editor textarea:focus {
  outline: none;
}
</style>
