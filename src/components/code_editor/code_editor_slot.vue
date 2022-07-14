<template>
  <dtc-code-editor-element
    v-if="name !== DEFAULT_SLOT_NAME"
    tag-name="template"
  >
    <template #attributes>
      <span>&nbsp;#{{ name }}</span>
    </template>
    <template #default>
      <dtc-code-editor-input
        v-if="slots"
        @input="onInput"
      >
        <slot />
      </dtc-code-editor-input>
    </template>
  </dtc-code-editor-element>
  <dtc-code-editor-input
    v-else
    @input="onInput"
  >
    <slot />
  </dtc-code-editor-input>
</template>

<script setup>
import DtcCodeEditorElement from './code_editor_element.vue';
import DtcCodeEditorInput from './code_editor_input.vue';
import { OPTIONS_UPDATE_EVENT } from '@/src/constants';

const DEFAULT_SLOT_NAME = 'default';

const props = defineProps({
  name: {
    type: String,
  },
});

const emit = defineEmits([OPTIONS_UPDATE_EVENT]);

function onInput (e) {
  emit(OPTIONS_UPDATE_EVENT, options => {
    options.slots[props.name] = e.target.textContent;
  });
}
</script>

<script>
export default {
  name: 'DtcCodeEditorSlot',
};
</script>
