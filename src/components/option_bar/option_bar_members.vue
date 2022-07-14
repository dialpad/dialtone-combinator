<template>
  <div>
    <template
      v-for="member in members"
      :key="member.name"
    >
      <dtc-control
        :name="member.name"
        :type-name="member.type.name"
        :value="values[member.name]"
        @update:value="e => emit(MEMBER_UPDATE_EVENT, {
          member,
          value: e,
        })"
      />
    </template>
  </div>
</template>

<script setup>
import DtcControl from './controls/control.vue';
import { MEMBER_UPDATE_EVENT } from '@/src/constants';

defineProps({
  component: {
    type: Object,
  },
  values: {
    type: Object,
  },
  members: {
    type: Object,
  },
});

const emit = defineEmits([MEMBER_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcOptionBarMembers',
};
</script>
