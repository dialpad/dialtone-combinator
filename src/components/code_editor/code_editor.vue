<template>
  <div class="dtc-code-editor d-bgc-black-600 d-fc-white d-p16">
    <dtc-code-editor-element
      :info="info"
      :options="options"
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

const props = defineProps({
  component: {
    type: Object,
  },
  info: {
    type: Object,
  },
  options: {
    type: Object,
  },
});

console.log(props.info);

const emit = defineEmits(['update-options']);
</script>

<script>
export default {
  name: 'DtcCodeEditor',
};
</script>

<style>
:root {
  --dtc-editor-color-base: #F8F8F2;
  --dtc-editor-color-element: #F92672;
  --dtc-editor-color-attribute: #A6E22E;
  --dtc-editor-color-string: #E6DB74;
}

.dtc-efc-base {
  color: var(--dtc-editor-color-base);
}

.dtc-efc-element {
  color: var(--dtc-editor-color-element);
}

.dtc-efc-attribute {
  color: var(--dtc-editor-color-attribute);
}

.dtc-efc-string {
  color: var(--dtc-editor-color-string);
}
</style>
