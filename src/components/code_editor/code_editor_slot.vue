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

const DEFAULT_SLOT_NAME = 'default';

const props = defineProps({
  name: {
    type: String,
  },
});

const emit = defineEmits(['update:options']);

function onInput (e) {
  emit('update:options', options => {
    options.slots[props.name] = e.target.textContent;
  });
}
</script>

<script>
export default {
  name: 'DtcCodeEditorSlot',
};
</script>
