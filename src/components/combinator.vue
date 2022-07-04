<template>
  <div class="dc-root d-d-grid d-h100p">
    <div class="dc-root__body_top d-grs1 d-of-y-auto d-bgc-transparent d-ba d-bc-black">
      <dc-renderer
        :component="component"
        :props="options.props"
      >
        <slot />
      </dc-renderer>
    </div>
    <div class="dc-root__body_bottom d-grs2 d-of-y-auto d-bgc-black-600">
      <dc-code-editor>
        {{ code }}
      </dc-code-editor>
    </div>
    <div class="dc-root__sidebar d-grs1 d-gr2 d-of-y-auto d-bgc-orange-200">
      <dc-option-bar
        :component="component"
        @change-props="onChangeProps"
      />
    </div>
  </div>
</template>

<script setup>
/* eslint vue/multi-word-component-names: 0 */

import 'vue-live/lib/vue-live.esm.css';
import DcOptionBar from './option_bar.vue';
import DcRenderer from './renderer.vue';
import DcCodeEditor from './code_editor.vue';
import { reactive } from 'vue';

const options = reactive({
  props: {},
});

defineProps({
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

function onChangeProps (props) {
  console.log(props);
  options.props = props;
}
</script>

<style>
.dc-root {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
}
</style>
