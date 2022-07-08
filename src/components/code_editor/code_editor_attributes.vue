<template>
  <div v-if="attributes">
    <template
      v-for="(value, key) in attributes"
      :key="key"
    >
      <div>
        <dtc-code-editor-indent />
        <span class="dtc-efc-attribute">{{ key }}</span>
        <span>=</span>
        <span class="dtc-efc-string">"</span>
        <span class="dtc-efc-string">{{ value }}</span>
        <span class="dtc-efc-string">"</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import DtcCodeEditorIndent from './code_editor_indent.vue';

defineProps({
  component: {
    type: Object,
  },
  attributes: {
    type: Object,
  },
});

</script>

<script>
export default {
  name: 'DtcCodeEditorTag',
};
</script>

<style>

</style>
