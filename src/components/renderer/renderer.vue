<template>
  <div class="dtc-renderer d-of-auto">
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
  },
  options: {
    type: Object,
  },
});
</script>

<script>
export default {
  name: 'DtcRenderer',
};
</script>
