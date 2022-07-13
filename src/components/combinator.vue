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
        v-model:theme="codeEditorTheme"
        v-model:scheme="codeEditorScheme"
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
import { computed, reactive, ref } from 'vue';

const DEFAULT_CODE_EDITOR_THEME = 'dark';
const CODE_EDITOR_THEME_KEY = 'dialtoneCombinatorEditorTheme';

const DEFAULT_CODE_EDITOR_SCHEME = 'highlight';
const CODE_EDITOR_SCHEME_KEY = 'dialtoneCombinatorEditorScheme';

const codeEditorThemeRef = ref(window.localStorage.getItem(CODE_EDITOR_THEME_KEY) || DEFAULT_CODE_EDITOR_THEME);
const codeEditorTheme = computed({
  get () {
    return codeEditorThemeRef.value;
  },
  set (value) {
    window.localStorage.setItem(CODE_EDITOR_THEME_KEY, value);
    codeEditorThemeRef.value = value;
  },
});

const codeEditorSchemeRef = ref(window.localStorage.getItem(CODE_EDITOR_SCHEME_KEY) || DEFAULT_CODE_EDITOR_SCHEME);
const codeEditorScheme = computed({
  get () {
    return codeEditorSchemeRef.value;
  },
  set (value) {
    window.localStorage.setItem(CODE_EDITOR_SCHEME_KEY, value);
    codeEditorSchemeRef.value = value;
  },
});

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

function updateOptions (e) {
  e(options);
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
.dtc-root { @import "@/src/assets/themes/default.less"; }
.dtc-theme-dark { @import "@/src/assets/themes/dark.less"; }
.dtc-theme-light { @import "@/src/assets/themes/light.less"; }
</style>
