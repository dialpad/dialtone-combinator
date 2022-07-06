<template>
  <span>
    <dtc-code-editor-tag>
      <span>{{ tag }}</span>
      <dtc-code-editor-attributes
        :component="component"
        :component-props="componentProps"
      />
    </dtc-code-editor-tag>
    <slot />
    <dtc-code-editor-tag closing>
      <span>{{ tag }}</span>
    </dtc-code-editor-tag>
  </span>
</template>

<script setup>
import DtcCodeEditorTag from './code_editor_tag.vue';
import DtcCodeEditorAttributes from './code_editor_attributes.vue';

defineProps({
  component: {
    type: Object,
  },
  componentProps: {
    type: Object,
  },
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
