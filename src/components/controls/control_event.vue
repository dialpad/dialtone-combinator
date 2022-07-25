<template>
  <div>
    <div class="d-d-flex d-jc-space-between">
      <slot />
      <template
        v-for="(type, index) in types"
        :key="index"
      >
        <span class="d-px6">
          <dt-badge class="d-ps-relative d-b2">
            {{ type }}
          </dt-badge>
        </span>
      </template>
    </div>
  </div>
</template>

<script setup>
import { DtBadge } from '@dialpad/dialtone-vue';
import { computed } from 'vue';

const props = defineProps({
  properties: {
    type: Object,
    default: undefined,
  },
});

const types = computed(() => {
  return props.properties?.map(property => {
    return property.type?.names;
  }).flat();
});
</script>

<script>
export default {
  name: 'DtcControlEvent',
};
</script>
