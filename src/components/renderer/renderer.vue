<template>
  <div class="dtc-renderer">
    <component
      :is="component"
      v-if="component"
      v-bind="options?.getMembers()"
    >
      <template
        v-for="(slot, name) in options?.slots"
        :key="name"
        #[name]
      >
        <!-- TODO: XSS Safe? -->
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
