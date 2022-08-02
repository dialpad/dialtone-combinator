<template>
  <div class="dtc-renderer d-of-auto d-d-flex d-jc-center d-ai-center d-w100p d-h100p">
    <component
      :is="component"
      v-bind="members"
    >
      <template
        v-for="(slot, name) in options.slots"
        :key="name"
        #[name]
      >
        <div v-html="slot" />
      </template>
    </component>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
});

const members = computed(() => {
  return props.options.getMembers();
});
</script>

<script>
export default {
  name: 'DtcRenderer',
};
</script>
