<template>
  <div>
    <template
      v-for="member in members"
      :key="member.name"
    >
      <div class="d-py6">
        <dtc-control
          :type="controlSelector(member)"
          :name="member.name"
          :value="getMemberValue(member)"
          :args="{
            defaultValue: getMemberDefaultValue(member),
            validValues: member.values,
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
import DtcControl from './option_bar_control';
import { MEMBER_UPDATE_EVENT } from '@/src/lib/constants';
import { parseJsonValue } from '@/src/lib/parse';

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
  controlSelector: {
    type: Function,
    default: () => undefined,
  },
});

const emit = defineEmits([MEMBER_UPDATE_EVENT]);

function getMemberValue (member) {
  return props.values[member.name] ?? getMemberDefaultValue(member);
}

function getMemberDefaultValue (member) {
  return member.defaultValue?.value
    ? parseJsonValue(member.defaultValue.value)
    : member.defaultValue;
}
</script>

<script>
export default {
  name: 'DtcOptionBarMembers',
};
</script>
