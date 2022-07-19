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
            items: member.values,
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
import DtcControl from './controls/control.vue';
import { MEMBER_UPDATE_EVENT } from '@/src/constants';

defineProps({
  component: {
    type: Object,
  },
  members: {
    type: Array,
  },
  values: {
    type: Object,
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
