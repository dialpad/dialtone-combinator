<template>
  <div>
    <dtc-code-editor-tag>
      <span class="dtc-fc-editor-element">{{ tagName }}</span>
      <slot name="attributes">
        <dtc-code-editor-attributes
          :info="info"
          :members="members"
        />
      </slot>
    </dtc-code-editor-tag>
    <slot />
    <dtc-code-editor-tag closing>
      <span class="dtc-fc-editor-element">{{ tagName }}</span>
    </dtc-code-editor-tag>
  </div>
</template>

<script setup>
import DtcCodeEditorTag from './code_editor_tag.vue';
import DtcCodeEditorAttributes from './code_editor_attributes.vue';

defineProps({
  info: {
    type: Object,
  },
  members: {
    type: Object,
  },
  tagName: {
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
