<template>
  <div>
    <template
      v-for="member in members"
      :key="member.name"
    >
      <dtc-control
        :name="member.name"
        :type-name="member.type.name"
        :value="options.value"
        @update:options="e => emit(OPTIONS_UPDATE_EVENT, e)"
      />
    </template>
  </div>
</template>

<script setup>
import DtcControl from './controls/control.vue';
import { OPTIONS_UPDATE_EVENT } from '@/src/constants';

defineProps({
  component: {
    type: Object,
  },
  options: {
    type: Object,
  },
  members: {
    type: Object,
  },
});

const emit = defineEmits([OPTIONS_UPDATE_EVENT]);
</script>

<script>
export default {
  name: 'DtcOptionBarMembers',
};
</script>
