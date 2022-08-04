<template>
  <div>
    <template
      v-for="(member, key) in memberMap"
      :key="key"
    >
      <div class="d-py6">
        <DtcOptionBarControl
          :name="member.name"
          :selected-type="member.type"
          :valid-types="member.validTypes"
          :value="member.value"
          :valid-values="member.values"
          :description="member.description"
          :tags="member.tags"
          :properties="member.properties"
          :args="{
            defaultValue: member.defaultValue,
          }"
          @update:value="e => updateMember(e, key)"
          @update:type="e => updateType(e, key)"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import DtcOptionBarControl from './option_bar_control';
import { MEMBER_UPDATE_EVENT } from '@/src/lib/constants';
import { parseDocDefault } from '@/src/lib/parse';
import { reactive } from 'vue';
import { controlMap, getContextControl } from '@/src/lib/control';
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
  onSetup: {
    type: Function,
    default: (member) => member.value,
  },
});

const emit = defineEmits([MEMBER_UPDATE_EVENT]);

const memberMap = reactive({
  ...Object.fromEntries(
    props.members.map(member => {
      return [getMemberKey(member), extractMember(member, props.values)];
    }),
  ),
});

function getMemberKey (member) {
  return member.name;
}

function extractMember (member, values) {
  const key = getMemberKey(member);

  const defaultValue = member.defaultValue
    ? parseDocDefault(member.defaultValue)
    : undefined;

  let value = getValue();

  const validTypes = props.typeSelector(member);
  const type = validTypes.find(type => controlMap[type]?.important) ?? getContextControl(value);

  const extracted = {
    ...member,
    type,
    validTypes,
    defaultValue,
    get value () { return getValue(); },
  };

  value = props.onSetup(extracted, value);

  // Initialize all default options
  updateMember(value, key);

  return extracted;

  function getValue () {
    return key in values
      ? values[key]
      : defaultValue;
  }
}

function updateMember (e, key) {
  emit(MEMBER_UPDATE_EVENT, {
    member: key,
    value: e,
  });
}

function updateType (e, key) {
  const member = memberMap[key];

  if (member.type === e) { return; }

  let value;
  try {
    value = convert(member.type, e, member.value);
  } catch {
    console.warn(`${member.name}: Unable to convert ${member.type} to ${e}`);
  }

  member.type = e;

  updateMember(value ?? controlMap[e]?.default, key);
}
</script>

<script>
export default {
  name: 'DtcOptionBarMembers',
};
</script>
