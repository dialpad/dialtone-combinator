<template>
  <div v-if="members && info">
    <template
      v-for="[attribute, value] in attributes"
      :key="attribute"
    >
      <div>
        <dtc-code-editor-indent />
        <span v-if="useBindOperator(value)">:</span>
        <span class="dtc-code-editor__attribute">{{ paramCase(attribute) }}</span>
        <span v-if="!useShortSyntax(value)">
          <span>=</span>
          <span class="dtc-code-editor__string">"</span>
          <span
            :class="{
              'dtc-code-editor__string': !useBindOperator(value),
              'dtc-code-editor__value': useBindOperator(value),
            }"
          >
            {{ value }}
          </span>
          <span class="dtc-code-editor__string">"</span>
        </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import DtcCodeEditorIndent from './code_editor_indent.vue';

import { paramCase } from 'change-case';
import { isDefaultPropValue } from '@/src/lib/utils';
import { computed } from 'vue';

const internalProps = defineProps({
  info: {
    type: Object,
    required: true,
  },
  members: {
    type: Object,
    required: true,
  },
});

const attributes = computed(() => {
  return Object.entries(internalProps.members).filter(([member, value]) => {
    const matchingProp = internalProps.info.props.find(prop => {
      return prop.name === member;
    });
    return matchingProp
      ? !isDefaultPropValue(value, matchingProp.defaultValue.value)
      : value;
  });
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
