<template>
  <span>
    <dtc-code-editor-tag>
      <span>{{ tag }}</span>
      <dtc-code-editor-attributes
        :component="component"
        :attributes="options?.getMembers()"
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
  options: {
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
