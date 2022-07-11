<template>
  <div v-if="attributes && info">
    <template
      v-for="[attribute, value] in Object.entries(attributes).filter(([attribute, value]) => {
        const prop = info.props.find(prop => {
          return prop.name === attribute;
        });
        return prop
          ? prop?.defaultValue.value !== value.toString()
          : value;
      })"
      :key="attribute"
    >
      <div>
        <dtc-code-editor-indent />
        <span class="dtc-fc-editor-attribute">{{ attribute }}</span>
        <span v-if="!useShortSyntax(value)">
          <span>=</span>
          <span class="dtc-fc-editor-string">"</span>
          <span class="dtc-fc-editor-string">{{ value }}</span>
          <span class="dtc-fc-editor-string">"</span>
        </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import DtcCodeEditorIndent from './code_editor_indent.vue';

defineProps({
  attributes: {
    type: Object,
  },
  info: {
    type: Object,
  },
});

function useShortSyntax (value) {
  return value === true;
}
</script>

<script>
export default {
  name: 'DtcCodeEditorTag',
};
</script>

<style>

</style>
