<template>
  <div>
    <template
      v-for="member in members"
      :key="getMemberKey(member)"
    >
      <div class="d-py6">
        <DtcOptionBarControl
          :name="member.name"
          :selectedType="getMemberType(member)"
          :valid-types="typeSelector(member)"
          :value="getMemberValue(member)"
          :valid-values="member.values"
          :description="member.description"
          :tags="member.tags"
          :properties="member.properties"
          :args="{
            defaultValue: getMemberDefaultValue(member),
          }"
          @update:value="e => emit(MEMBER_UPDATE_EVENT, {
            member,
            value: e,
          })"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import DtcOptionBarControl from './option_bar_control';
import { MEMBER_UPDATE_EVENT } from '@/src/lib/constants';
import { parseDocDefault } from '@/src/lib/parse';
import { UNSET } from '@/src/lib/utils';
import { reactive } from 'vue';

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
  members: {
    type: Array,
    required: true,
  },
  values: {
    type: Object,
    required: true,
  },
  typeSelector: {
    type: Function,
    default: () => [],
  },
});

const emit = defineEmits([MEMBER_UPDATE_EVENT]);

const memberTypes = reactive({});

function getMemberKey (member) {
  return member.name;
}

function getMemberValue (member) {
  return member.name in props.values
    ? props.values[member.name]
    : getMemberDefaultValue(member);
}

function getMemberDefaultValue (member) {
  const defaultInfo = member.defaultValue;
  if (!defaultInfo) { return undefined; }
  return parseDocDefault(defaultInfo);
}

function getMemberType (member) {
  const key = getMemberKey(member);

  let type = memberTypes[key];
  if (!type) {
    type = getMemberDefaultType(member);
    memberTypes[key] = type;
  }

  const validTypes = props.typeSelector(member);

  return validTypes.includes(type)
    ? type
    : validTypes[0];
}

function getMemberDefaultType (member) {
  const value = getMemberValue(member);

  let type = value == null || value === UNSET
    ? 'null'
    : typeof value;

  switch (type) {
    case 'object': {
      type = Array.isArray(value)
        ? 'array'
        : 'object';
    }
  }

  return type;
}
</script>

<script>
export default {
  name: 'DtcOptionBarMembers',
};
</script>
