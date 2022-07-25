<template>
  <div v-if="members && info">
    <template
      v-for="[name, { value, prop }] in attributes"
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
            {{ value }}
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
    ? filterProp(member.value, member.prop.defaultValue.value)
    : filterAttribute(member.value);
}

function filterProp (value, defaultValue) {
  if (internalProps.verbose) {
    return true;
  }

  if (!defaultValue) {
    return false;
  }

  return value !== parseJsonValue(defaultValue);
}

function filterAttribute (value) {
  if (internalProps.verbose) {
    return true;
  }
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
</script>

<script>
export default {
  name: 'DtcCodeEditorAttributes',
};
</script>
