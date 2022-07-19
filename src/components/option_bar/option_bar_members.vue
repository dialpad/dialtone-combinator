<template>
  <div>
    <template
      v-for="member in members"
      :key="member.name"
    >
      <div class="d-py4">
        <dtc-control
          :type="controlSelector(member)"
          :name="member.name"
          :value="values[member.name]"
          :args="{
            values: member.values,
            defaultValue: member.defaultValue?.value,
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
import DtcControl from './option_bar_control.vue';
import { MEMBER_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
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
</script>

<script>
export default {
  name: 'DtcOptionBarMembers',
};
</script>
