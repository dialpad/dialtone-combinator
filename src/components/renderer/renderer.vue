<template>
  <div class="dtc-renderer d-of-auto d-d-flex d-jc-center d-ai-center d-w100p d-h100p">
    <component
      :is="component"
      v-bind="options.getMembers()"
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
defineProps({
  component: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
});
</script>

<script>
export default {
  name: 'DtcRenderer',
};
</script>
