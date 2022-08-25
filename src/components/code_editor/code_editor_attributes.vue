<template>
  <div>
    <template
      v-for="[name, { value, getLabel }] in visibleMembers"
      :key="name"
    >
      <div>
        <dtc-code-editor-indent />
        <span v-if="useBindOperator(value)">:</span>
        <span class="dtc-scheme__class">
          {{ getLabel() }}
        </span>
        <span v-if="!useShortSyntax(value)">
          <span>=</span>
          <span class="dtc-scheme__string">"</span>
          <span
            :class="{
              'dtc-scheme__string': !useBindOperator(value),
              'dtc-scheme__value': useBindOperator(value),
            }"
          >
            {{ stringifyValue(value) }}
          </span>
          <span class="dtc-scheme__string">"</span>
        </span>
      </div>
    </template>
  </div>
</template>

<script setup>
import DtcCodeEditorIndent from './code_editor_indent';

import { computed } from 'vue';
import { stringifyDocValue } from '@/src/lib/parse';

const props = defineProps({
  /**
   * Info data object.
   */
  info: {
    type: Object,
    required: true,
  },
  /**
   * Members to display as tag attributes.
   */
  members: {
    type: Object,
    required: true,
  },
  /**
   * Show all attributes regardless of default value.
   */
  verbose: {
    type: Boolean,
    default: false,
  },
});

const visibleMembers = computed(() => {
  const members = mapMembers(props.members);
  return members.filter(([name, member]) => visible(name, member));
});

const bindings = computed(() => {
  return props.info.bindings.get();
});

function mapMembers (members) {
  return Object.entries(members).map(([name, value]) => {
    const memberInfo = bindings.value.find(member => member.name === name);
    return [name, {
      ...memberInfo,
      value,
    }];
  });
}

function visible (name, member) {
  if (props.verbose) { return true; }

  const defaultString = JSON.stringify(member.defaultValue);
  const valueString = JSON.stringify(member.value);

  return defaultString !== valueString;
}

function useShortSyntax (value) {
  return value === true;
}

function useBindOperator (value) {
  return !useShortSyntax(value) && typeof value !== 'string';
}

function stringifyValue (value) {
  if (!value) { return `${value}`; }
  return useBindOperator(value)
    ? stringifyDocValue(value)
    : value.toString();
}
</script>

<script>
/**
 * This component generates all the attribute fields to be included on the element tag.
 */
export default {
  name: 'DtcCodeEditorAttributes',
};
</script>
