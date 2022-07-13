<template>
  <div v-if="members && info">
    <template
      v-for="[attribute, value] in Object.entries(members).filter(([member, value]) => {
        const prop = info.props.find(prop => {
          return prop.name === member;
        });
        return prop
          ? prop.defaultValue.value !== value.toString()
          : value;
      })"
      :key="attribute"
    >
      <div>
        <dtc-code-editor-indent />
        <span v-if="useBindOperator(value)">:</span>
        <span class="dtc-fc-editor-attribute">{{ attribute }}</span>
        <span v-if="!useShortSyntax(value)">
          <span>=</span>
          <span class="dtc-fc-editor-string">"</span>
          <span
            :class="{
              'dtc-fc-editor-string': !useBindOperator(value),
              'dtc-fc-editor-value': useBindOperator(value),
            }"
          >{{ value }}</span>
          <span class="dtc-fc-editor-string">"</span>
        </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import DtcCodeEditorIndent from './code_editor_indent.vue';

defineProps({
  info: {
    type: Object,
  },
  members: {
    type: Object,
  },
});

function useShortSyntax (value) {
  return value === true;
}

function useBindOperator (value) {
  return !useShortSyntax(value) && typeof value !== 'string';
}
</script>

<script>
export default {
  name: 'DtcCodeEditorAttributes',
};
</script>

<style>

</style>
