<template>
  <div
    class="dtc-code-editor d-as-stretch d-p16 d-w100p"
    :class="[
      `dtc-code-editor-theme-${theme}`,
      `dtc-scheme-${scheme}`,
    ]"
  >
    <dtc-code-editor-element
      :info="info"
      :options="options"
    >
      <dtc-code-editor-slot
        name="default"
        :slots="options?.slots"
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
  scheme: {
    type: String,
  },
  theme: {
    type: String,
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
.dtc-code-editor {
  @import "src/assets/themes/code_editor/default.less";
  color: var(--dtc-theme-color-foreground);
  background-color: var(--dtc-theme-color-background);
}

.dtc-code-editor-editable {
  padding: var(--su2) var(--su4) var(--su2) var(--su4);
  border-radius: var(--su6);
  border: var(--dtc-theme-color-background-lighten) solid var(--su1);
  background-color: var(--dtc-theme-color-background-darken);
  outline: none;
}

.dtc-code-editor-theme-highlight {
  @import "src/assets/themes/code_editor/highlight.less";
}

.dtc-fc-editor-element {
  color: var(--dtc-theme-color-element);
}

.dtc-fc-editor-attribute {
  color: var(--dtc-theme-color-attribute);
}

.dtc-fc-editor-string {
  color: var(--dtc-theme-color-string);
}
</style>
