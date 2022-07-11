<template>
  <div class="dtc-code-editor d-p16">
    <dtc-code-editor-element
      :info="info"
      :options="options"
    >
      <dtc-code-editor-slot
        :slots="options?.slots"
        name="default"
        @update-options="e => emit('update-options', e)"
      />
    </dtc-code-editor-element>
  </div>
</template>

<script setup>
import DtcCodeEditorElement from './code_editor_element.vue';
import DtcCodeEditorSlot from './code_editor_slot.vue';

defineProps({
  component: {
    type: Object,
  },
  info: {
    type: Object,
  },
  options: {
    type: Object,
  },
});

const emit = defineEmits(['update-options']);
</script>

<script>
export default {
  name: 'DtcCodeEditor',
};
</script>

<style lang="less">
@color-background: rgb(68, 65, 80);

:root {
  --dtc-editor-color-base: #F8F8F2;
  --dtc-editor-color-element: #F92672;
  --dtc-editor-color-attribute: #A6E22E;
  --dtc-editor-color-string: #E6DB74;
  --dtc-editor-color-background: @color-background;
  --dtc-editor-color-background-darken: darken(@color-background, 10%);
  --dtc-editor-color-background-lighten: lighten(@color-background, 10%);
}

.dtc-fc-editor-element {
  color: var(--dtc-editor-color-element);
}

.dtc-fc-editor-attribute {
  color: var(--dtc-editor-color-attribute);
}

.dtc-fc-editor-string {
  color: var(--dtc-editor-color-string);
}

.dtc-code-editor {
  color: var(--dtc-editor-color-base);
  background-color: var(--dtc-editor-color-background);
}

.dtc-code-editor__editable {
  padding: var(--su2) var(--su4) var(--su2) var(--su4);
  background-color: var(--dtc-editor-color-background-darken);
  border: var(--dtc-editor-color-background-lighten) solid var(--su1);
  border-radius: var(--su6);
  outline: none;
}
</style>
