<template>
  <div class="dc-renderer">
    <slot />
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
  },
};
</script>
