<template>
  <div>
    <dtc-code-editor-tag>
      <span class="dtc-fc-editor-element">{{ tagName }}</span>
      <dtc-code-editor-attributes
        :info="info"
        :attributes="options.getMembers()"
      />
    </dtc-code-editor-tag>
    <dtc-code-editor-indent />
    <slot />
    <dtc-code-editor-tag closing>
      <span class="dtc-fc-editor-element">{{ tagName }}</span>
    </dtc-code-editor-tag>
  </div>
</template>

<script setup>
import DtcCodeEditorTag from './code_editor_tag.vue';
import DtcCodeEditorAttributes from './code_editor_attributes.vue';
import DtcCodeEditorIndent from './code_editor_indent.vue';

import { paramCase } from 'change-case';
import { computed } from 'vue';

const props = defineProps({
  info: {
    type: Object,
  },
  options: {
    type: Object,
  },
});

const tagName = computed(() => paramCase(props.info.displayName));
</script>

<script>
export default {
  name: 'DtcCodeEditorElement',
};
</script>

<style>

</style>
