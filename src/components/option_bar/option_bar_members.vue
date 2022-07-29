<template>
  <div>
    <template
      v-for="member in members"
      :key="member.name"
    >
      <div class="d-py6">
        <DtcOptionBarControl
          :name="member.name"
          :value="getMemberValue(member)"
          :valid-values="member.values"
          :valid-types="typeSelector(member)"
          :description="member.description"
          :tags="member.tags"
          :args="{
            defaultValue: getMemberDefaultValue(member),
            properties: member.properties,
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

function getMemberValue (member) {
  return props.values[member.name] ?? getMemberDefaultValue(member);
}

function getMemberDefaultValue (member) {
  const defaultInfo = member.defaultValue;
  if (!defaultInfo) { return undefined; }
  return parseDocDefault(defaultInfo);
}
</script>

<script>
export default {
  name: 'DtcOptionBarMembers',
};
</script>
