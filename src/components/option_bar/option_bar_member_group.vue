<template>
  <div>
    <template
      v-for="(member, key) in memberMap"
      :key="key"
    >
      <div
        class="d-py6"
        data-qa="dtc-option-bar-member-group-control"
      >
        <DtcOptionBarControl
          :label="member.getLabel()"
          :control="member.control"
          :valid-controls="member.validControls"
          :value="values[key]"
          :description="member.description"
          :types="member.type?.names"
          :tags="member.tags"
          :args="{
            defaultValue: member.defaultValue,
            validValues: member.values,
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
  /**
   * Target component.
   */
  component: {
    type: Object,
    required: true,
  },
  /**
   * Array of members to generate controls for.
   */
  members: {
    type: Array,
    required: true,
  },
  /**
   * Map of key-value pairs for each member.
   */
  values: {
    type: Object,
    required: true,
  },
  /**
   * Function that determines the control selections for
   * a given member by returning an array of valid controls.
   */
  controlSelector: {
    type: Function,
    default: (member) => [],
  },
});

const emit = defineEmits([MEMBER_UPDATE_EVENT]);

/**
 * The member map is a reactive data object that wraps each member and
 * provides additional data that the 'option bar control' component
 * needs without affecting the original member data object.
 *
 * @type {object}
 */
const memberMap = reactive({
  ...Object.fromEntries(
    props.members.map(member => {
      return [getMemberKey(member), extendMember(member)];
    }),
  ),
});

/**
 * Used to match members in the 'member map' to their respective values.
 *
 * @returns {*}
 */
function getMemberKey (member) {
  return member.name;
}

/**
 * Wraps a member with an object containing additional data about the member.
 * This is used by the 'member map' to hold data about controls.
 *
 * @returns {object}
 */
function extendMember (member) {
  const key = getMemberKey(member);
  const value = props.values[key];

  const validControls = props.controlSelector(member);
  const control = validControls?.find(control => controlMap[control]?.important) ?? getControlByValue(value);

  return {
    ...member,
    control,
    validControls,
  };
}

/**
 * Emits an update to a member.
 *
 * @param key - The member key
 * @param e - The updated value
 */
function updateMember (e, key) {
  emit(MEMBER_UPDATE_EVENT, {
    member: key,
    value: e,
  });
}

/**
 * Updates the member's control in the 'member map'.
 *
 * @param e - The updated control
 * @param key - The member key
 */
function updateControl (e, key) {
  const member = memberMap[key];

  let value;
  try {
    value = convert(member.control, e, props.values[key]);
  } catch {
    console.warn(`${member.name}: Unable to convert ${member.control} to ${e}`);
  }

  member.control = e;
  updateMember(value ?? controlMap[e]?.default, key);
}
</script>

<script>
/**
 * The member group receives a group of members and their respective values.
 * It is responsible for rendering 'option bar control' components for each member.
 */
export default {
  name: 'DtcOptionBarMemberGroup',
};
</script>
