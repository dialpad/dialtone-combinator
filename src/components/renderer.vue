<template>
  <div
    class="dc-renderer"
  >
    <component
      :is="component"
      v-if="component"
      v-bind="props"
    >
      <template
        v-for="(slot, name) in slots"
        #[name]
      >
        {{ slot }}
      </template>
    </component>
  </div>
</template>

<script>
export default {
  name: 'DcRenderer',
  props: {
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
  },
};
</script>
