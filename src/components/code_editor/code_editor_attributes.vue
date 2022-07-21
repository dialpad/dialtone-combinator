<template>
  <div v-if="members && info">
    <template
      v-for="[attribute, value] in attributes"
      :key="attribute"
    >
      <div>
        <dtc-code-editor-indent />
        <span v-if="useBindOperator(value)">:</span>
        <span class="dtc-scheme__class">{{ paramCase(attribute) }}</span>
        <span v-if="!useShortSyntax(value)">
          <span>=</span>
          <span class="dtc-scheme__string">"</span>
          <span
            :class="{
              'dtc-scheme__string': !useBindOperator(value),
              'dtc-scheme__value': useBindOperator(value),
            }"
          >
            {{ value }}
          </span>
          <span class="dtc-scheme__string">"</span>
        </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import DtcCodeEditorIndent from './code_editor_indent.vue';

import { paramCase } from 'change-case';
import { computed } from 'vue';
import { parseJsonValue } from '@/src/lib/parse';

const internalProps = defineProps({
  info: {
    type: Object,
    required: true,
  },
  members: {
    type: Object,
    required: true,
  },
  verbose: {
    type: Boolean,
    default: false,
  },
});

const attributes = computed(() => {
  const members = Object.entries(internalProps.members);
  return internalProps.verbose
    ? members
    : members.filter(([member, value]) => {
      const matchingProp = internalProps.info.props.find(prop => {
        return prop.name === member;
      });
      return matchingProp
        ? value !== parseJsonValue(matchingProp.defaultValue.value)
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
