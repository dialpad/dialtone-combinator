<template>
  <div v-if="isEmpty">
    <template
      v-for="[name, { value, label }] in bindingMap"
      :key="name"
    >
      <div>
        <dtc-code-editor-indent />
        <span v-if="useBindOperator(value)">:</span>
        <span class="dtc-scheme__class">
          {{ label }}
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
  infoBindings: {
    type: Array,
    required: true,
  },
  /**
   * Binding members to be displayed as attributes.
   */
  optionBindings: {
    type: Object,
    required: true,
  },
  /**
   * Show all bindings regardless of default value.
   */
  verbose: {
    type: Boolean,
    default: false,
  },
});

const bindingMap = computed(() => {
  return Object.entries(props.optionBindings).map(([bindingName, value]) => {
    const bindingInfo = props.infoBindings.find(infoBinding => infoBinding.name === bindingName);
    return [bindingName, {
      ...bindingInfo,
      value,
    }];
  }).filter(([name, member]) => visible(name, member));
});

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

const isEmpty = computed(() => {
  return bindingMap.value.length > 0;
});
</script>

<script>
/**
 * This component generates all the attribute fields to be included on the element tag.
 */
export default {
  name: 'DtcCodeEditorTagAttributes',
};
</script>