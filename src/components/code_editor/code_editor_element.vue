<template>
  <div>
    <dtc-code-editor-tag>
      <span class="dtc-efc-element">{{ tag }}</span>
      <dtc-code-editor-attributes
        :component="component"
        :attributes="options?.getMembers?.()"
      />
    </dtc-code-editor-tag>
    <dtc-code-editor-indent />
    <slot />
    <dtc-code-editor-tag closing>
      <span class="dtc-efc-element">{{ tag }}</span>
    </dtc-code-editor-tag>
  </div>
</template>

<script setup>
import DtcCodeEditorTag from './code_editor_tag.vue';
import DtcCodeEditorAttributes from './code_editor_attributes.vue';
import DtcCodeEditorIndent from './code_editor_indent.vue';

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

<style>

</style>
