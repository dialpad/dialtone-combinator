<template>
  <div class="dtc-renderer">
    <component
      :is="component"
      v-if="component"
      v-bind="props"
    >
      <template
        v-for="(slot, name) in slots"
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
    default: null,
  },
  props: {
    type: Object,
    default: null,
  },
  slots: {
    type: Object,
    default: null,
  },
});
</script>

<script>
export default {
  name: 'DtcRenderer',
};
</script>
