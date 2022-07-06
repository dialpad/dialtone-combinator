<template>
  <div class="dtc-root d-d-grid d-h100p">
    <div class="dtc-root__top d-grs1 d-of-y-auto d-bgc-transparent d-ba d-bc-black">
      <dc-renderer
        :component="component"
        :options="options"
      />
    </div>
    <div class="dtc-root__bottom d-grs2 d-of-y-auto d-bgc-black-600">
      <dc-code-editor
        :component="component"
        :options="options"
        @update-options="updateOptions"
      >
        {{ code }}
      </dc-code-editor>
    </div>
    <div class="dtc-root__sidebar d-grs1 d-gr2 d-of-y-auto d-bgc-orange-200">
      <dc-option-bar
        ref="options"
        :component="component"
        :options="options"
        @update-options="updateOptions"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint vue/multi-word-component-names: 0 */

import 'vue-live/lib/vue-live.esm.css';

import DcOptionBar from './option_bar/option_bar.vue';
import DcRenderer from './renderer/renderer.vue';
import DcCodeEditor from './code_editor/code_editor.vue';

import { reactive } from 'vue';
import { paramCase } from 'change-case';

const props = defineProps({
  code: {
    type: String,
  },
  component: {
    type: Object,
  },
});

const options = reactive({
  props: {
    active: true,
  },
  slots: {
    default: paramCase(props.component.name),
  },
});

function updateOptions (update) {
  update(options);
}
</script>

<script>
export default {
  name: 'DtcCombinator',
};
</script>

<style>
.dtc-root {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
}
</style>
