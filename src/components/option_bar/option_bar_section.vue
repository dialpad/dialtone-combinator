<template>
  <li>
    <dt-list-item
      role="listitem"
      element-type="div"
      navigation-type="tab"
      @click="toggle"
    >
      <template #default>
        <h2>
          {{ heading }}
        </h2>
      </template>
      <template #right>
        <icon-collapse v-if="show" />
        <icon-expand v-else />
      </template>
    </dt-list-item>
    <div
      v-if="show"
      class="d-px12"
    >
      <slot />
    </div>
  </li>
</template>

<script setup>
import IconExpand from '@dialpad/dialtone/lib/dist/vue/icons/IconArrowKeyboardDown.vue';
import IconCollapse from '@dialpad/dialtone/lib/dist/vue/icons/IconArrowKeyboardUp.vue';
import { DtListItem } from '@dialpad/dialtone-vue';

import { ref } from 'vue';

defineProps({
  heading: {
    type: String,
    required: true,
  },
});

const show = ref(true);

function toggle () {
  show.value = !show.value;
}

</script>

<script>
export default {
  name: 'DtcOptionBarSection',
};
</script>
