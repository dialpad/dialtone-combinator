<template>
  <div>
    <template
      v-for="[name, { value, prop }] in visibleMembers"
      :key="name"
    >
      <div>
        <dtc-code-editor-indent />
        <span v-if="useBindOperator(value)">:</span>
        <span class="dtc-scheme__class">
          {{ getLabel(name, prop) }}
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
import { getPropLabel } from '@/src/lib/utils_vue';
import { stringifyDocValue } from '@/src/lib/parse';

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

const visibleMembers = computed(() => {
  const attributes = mapAttributes(internalProps.members);
  return attributes.filter(([name, member]) => visible(name, member));
});

function mapAttributes (members) {
  return Object.entries(members).map(([name, value]) => {
    return [name, {
      prop: internalProps.info.props.find(prop => {
        return prop.name === name;
      }),
      value,
    }];
  });
}

function visible (name, member) {
  return member.prop
    ? filterProp(member.value, member.prop.defaultValue)
    : filterAttribute(member.value);
}

function filterProp (value, defaultValue) {
  if (internalProps.verbose) { return true; }

  const defaultString = JSON.stringify(defaultValue);
  const valueString = JSON.stringify(value);

  return defaultString !== valueString;
}

function filterAttribute (value) {
  return !!value;
}

function getLabel (name, prop) {
  return prop
    ? getPropLabel(prop.name, prop.tags)
    : name;
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
export default {
  name: 'DtcCodeEditorAttributes',
};
</script>
