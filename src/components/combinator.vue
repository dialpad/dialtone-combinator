<template>
  <div class="dc-root d-d-grid d-h100p">
    <vue-live
      v-if="!loading"
      :code="props.code"
      :components="props.componentSet"
      :editor-props="{ lineNumbers: true, ignoreTabKey: true }"
      :layout="layout"
      check-variable-availability
    />
    <div class="dc-root__sidebar d-grs1 d-gr2 d-of-y-auto d-bgc-orange-200">
      <dc-option-bar />
    </div>
  </div>
</template>

<script setup>
/* eslint vue/multi-word-component-names: 0 */

import 'vue-live/lib/vue-live.esm.css';
import DcOptionBar from './option_bar.vue';
import DcCombinatorBody from './combinator_body.vue';

import { VueLive } from 'vue-live';
import { markRaw, ref, defineProps } from 'vue';

const layout = markRaw(DcCombinatorBody);
const props = defineProps({
  code: {
    type: String,
    default: undefined,
  },
  component: {
    type: Object,
    default: null,
  },
  componentSet: {
    type: Object,
    default: undefined,
  },
});

const loading = ref(false);
</script>

<style>
.dc-root {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
}
</style>
