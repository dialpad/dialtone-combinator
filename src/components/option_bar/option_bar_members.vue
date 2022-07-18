<template>
  <div>
    <template
      v-for="member in members"
      :key="member.name"
    >
      <div class="d-py4">
        <dtc-control
          :name="member.name"
          :control-name="controlName || member.type.name"
          :value="values[member.name]"
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
  values: {
    type: Object,
  },
  members: {
    type: Object,
  },
  controlName: {
    type: String,
    default: undefined,
  },
});

const emit = defineEmits([MEMBER_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcOptionBarMembers',
};
</script>
