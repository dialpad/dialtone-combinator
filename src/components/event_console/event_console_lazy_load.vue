<template>
  <span>
    <span v-if="!show">
      <slot name="prefix" />
      <dt-button
        class="dtc-theme__button dtc-theme__interactive d-p4"
        size="sm"
        importance="clear"
        @click="toggle"
      >
        <template #icon>
          <IconExpand />
        </template>
      </dt-button>
      <slot name="suffix" />
    </span>
    <span v-else>
      <dt-button
        class="dtc-theme__button dtc-theme__interactive d-p0"
        size="xl"
        importance="clear"
        @click="toggle"
      >
        <template #icon>
          <IconCollapse />
        </template>
      </dt-button>
    </span>
    <dt-lazy-show :show="show">
      <slot />
    </dt-lazy-show>
  </span>
</template>

<script setup>
import IconExpand from '%/IconMenuHorizontal';
import IconCollapse from '%/IconArrowAccordion';

import { DtButton, DtLazyShow } from '@dialpad/dialtone-vue';

import { ref } from 'vue';

const emit = defineEmits(['toggle']);

const show = ref(false);

function toggle () {
  const value = !show.value;
  show.value = value;
  emit('toggle', value);
}
</script>

<script>
export default {
  name: 'DtcEventConsoleLazyLoad',
};
</script>
