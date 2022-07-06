<template>
  <div class="dtc-code-editor d-bgc-black-600 d-fc-white d-p16">
    <dtc-code-editor-element
      :component="component"
      :component-props="options?.props"
      :tag="tag"
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

import { paramCase } from 'change-case';
import { computed } from 'vue';

const props = defineProps({
  component: {
    type: Object,
  },
  options: {
    type: Object,
  },
});

const emit = defineEmits(['update-options']);

const tag = computed(() => paramCase(props.component.name));
</script>

<script>
export default {
  name: 'DtcCodeEditor',
};
</script>
