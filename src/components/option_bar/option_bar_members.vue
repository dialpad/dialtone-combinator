<template>
  <div>
    <template
      v-for="(member, key) in memberMap"
      :key="key"
    >
      <div class="d-py6">
        <DtcOptionBarControl
          :name="member.name"
          :control="member.control"
          :valid-controls="member.validControls"
          :value="getMemberValue(key)"
          :valid-values="member.values"
          :description="member.description"
          :tags="member.tags"
          :properties="member.properties"
          :args="{
            defaultValue: member.defaultValue,
          }"
          @update:value="e => updateMember(e, key)"
          @update:control="e => updateControl(e, key)"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import DtcOptionBarControl from './option_bar_control';
import { MEMBER_UPDATE_EVENT } from '@/src/lib/constants';
import { reactive } from 'vue';
import { controlMap, getControlByValue } from '@/src/lib/control';
import { convert } from '@/src/lib/convert';

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

const memberMap = reactive({
  ...Object.fromEntries(
    props.members.map(member => {
      return [getMemberKey(member), extendMember(member)];
    }),
  ),
});

function getMemberKey (member) {
  return member.name;
}

function getMemberValue (key) {
  return props.values[key];
}

function extendMember (member) {
  const key = getMemberKey(member);
  const value = getMemberValue(key);

  const validControls = props.typeSelector(member) ?? [];
  const control = validControls.find(control => controlMap[control]?.important) ?? getControlByValue(value);

  return {
    ...member,
    control,
    validControls,
  };
}

function updateMember (e, key) {
  emit(MEMBER_UPDATE_EVENT, {
    member: key,
    value: e,
  });
}

function updateControl (e, key) {
  const member = memberMap[key];

  if (member.control === e) { return; }

  let value;
  try {
    value = convert(member.control, e, member.value);
  } catch {
    console.warn(`${member.name}: Unable to convert ${member.control} to ${e}`);
  }

  member.control = e;
  updateMember(value ?? controlMap[e]?.default, key);
}
</script>

<script>
export default {
  name: 'DtcOptionBarMembers',
};
</script>
