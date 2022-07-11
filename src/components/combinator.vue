<template>
  <div class="dtc-root d-d-grid d-h100p">
    <div class="dtc-root__top dtc-root-item d-grs1 d-ba d-bc-black">
      <dc-renderer
        :component="component"
        :options="options"
      />
    </div>
    <div class="dtc-root__bottom dtc-root-item d-grs2">
      <dc-code-editor
        scheme="dark"
        theme="highlight"
        :component="component"
        :info="info"
        :options="options"
        @update-options="updateOptions"
      />
    </div>
    <div class="dtc-root__sidebar dtc-root-item d-grs1 d-gr2">
      <dc-option-bar
        :component="component"
        :options="options"
        @update-options="updateOptions"
      />
    </div>
  </div>
</template>

<script setup>
import DcOptionBar from './option_bar/option_bar.vue';
import DcRenderer from './renderer/renderer.vue';
import DcCodeEditor from './code_editor/code_editor.vue';

import documentation from '@dialpad/dialtone-vue/dist/component-documentation.json';

import { paramCase } from 'change-case';
import { computed, reactive } from 'vue';

const props = defineProps({
  component: {
    type: Object,
  },
});

const options = reactive({
  slots: {
    default: paramCase(props.component.name),
  },
  props: {
    active: false,
  },
  attributes: {
    disabled: false,
  },
  getMembers: function () {
    return {
      ...this?.props,
      ...this?.attributes,
    };
  },
});

const info = computed(() => {
  return documentation.find(componentInfo => componentInfo.displayName === props.component.name);
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

.dtc-root-item {
  display: flex;
  align-items: flex-start;
  overflow-y: auto;
}
</style>

<style lang="less">
.dtc-root {
  @import "@/src/assets/themes/scheme/default.less";
}

.dtc-scheme-dark {
  @import "@/src/assets/themes/scheme/dark.less";
}

.dtc-scheme-light {
  @import "@/src/assets/themes/scheme/light.less";
}
</style>
