<template>
  <div>
    <dtc-code-editor-tag
      :type="tagType"
    >
      <span class="dtc-fc-editor-element">{{ tagName }}</span>
      <slot name="attributes">
        <dtc-code-editor-attributes
          :info="info"
          :members="members"
        />
      </slot>
    </dtc-code-editor-tag>
    <slot />
    <dtc-code-editor-tag
      v-if="!selfClosing"
      type="closing"
    >
      <span class="dtc-fc-editor-element">{{ tagName }}</span>
    </dtc-code-editor-tag>
  </div>
</template>

<script setup>
import DtcCodeEditorTag from './code_editor_tag.vue';
import DtcCodeEditorAttributes from './code_editor_attributes.vue';
import { computed } from 'vue';

const props = defineProps({
  info: {
    type: Object,
    default: undefined,
  },
  members: {
    type: Object,
    default: undefined,
  },
  tagName: {
    type: String,
    required: true,
  },
  selfClosing: {
    type: Boolean,
    default: false,
  },
});

const tagType = computed(() => {
  return props.selfClosing ? 'self-closing' : 'default';
});
</script>

<script>
export default {
  name: 'DtcCodeEditorElement',
};
</script>
