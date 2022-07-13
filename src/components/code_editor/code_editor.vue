<template>
  <div
    class="dtc-code-editor d-d-flex d-as-stretch d-p16 d-w100p"
    :class="[
      `dtc-theme-${theme}`,
      `dtc-code-editor-scheme-${scheme}`,
    ]"
  >
    <div
      ref="code"
      class="d-fl-grow1"
    >
      <dtc-code-editor-element
        :info="info"
        :options="options"
      >
        <dtc-code-editor-slot
          name="default"
          :slots="options.slots"
          @update:options="e => emit('update:options', e)"
        />
      </dtc-code-editor-element>
    </div>
    <div class="d-d-flex d-fd-column d-ai-flex-end d-jc-space-between">
      <dt-popover
        transition="pop"
        :modal="false"
        :open="showCopyPopover"
      >
        <template #anchor="{ attrs }">
          <dt-button
            v-bind="attrs"
            importance="clear"
            size="lg"
            @click="copy"
          >
            <template #default>
              Copy
            </template>
            <template #icon>
              <IconContentCopy />
            </template>
          </dt-button>
        </template>
        <template #content>
          <span>Copied to clipboard</span>
        </template>
      </dt-popover>
      <dtc-code-editor-settings
        v-model:theme="theme"
        v-model:scheme="scheme"
      />
    </div>
  </div>
</template>

<script setup>
import DtcCodeEditorElement from './code_editor_element.vue';
import DtcCodeEditorSlot from './code_editor_slot.vue';
import DtcCodeEditorSettings from './code_editor_settings.vue';
import IconContentCopy from '@dialpad/dialtone/lib/dist/vue/icons/IconContentCopy.vue';
import { DtButton, DtPopover } from '@dialpad/dialtone-vue';

import settings from '@/src/settings.json';
import { CODE_EDITOR_SCHEME_KEY, CODE_EDITOR_THEME_KEY } from '@/src/constants';
import { cachedRef } from '@/src/lib/utils';
import { ref } from 'vue';

defineProps({
  component: {
    type: Object,
  },
  info: {
    type: Object,
  },
  options: {
    type: Object,
  },
});

const emit = defineEmits([
  'update:options',
]);

const theme = cachedRef(CODE_EDITOR_THEME_KEY, settings['code-editor']['default-theme']);
const scheme = cachedRef(CODE_EDITOR_SCHEME_KEY, settings['code-editor']['default-scheme']);

const code = ref();
const showCopyPopover = ref(false);

async function copy () {
  await navigator.clipboard.writeText(code.value.innerText);
  showCopyPopover.value = true;
  await new Promise(resolve => setTimeout(resolve, 100));
  showCopyPopover.value = false;
}
</script>

<script>
export default {
  name: 'DtcCodeEditor',
};
</script>

<style lang="less">
.dtc-code-editor-editable {
  padding: var(--su2) var(--su4) var(--su2) var(--su4);
  border-radius: var(--su6);
  border: solid var(--su1);
  outline: none;
}
</style>

<style lang="less">
.dtc-code-editor { @import "@/src/assets/themes/scheme_code_editor/default.less"; }
.dtc-code-editor-scheme-highlight { @import "@/src/assets/themes/scheme_code_editor/highlight.less"; }

.dtc-code-editor {
  color: var(--dtc-theme-color-foreground);
  background-color: var(--dtc-theme-color-background);
}

.dtc-code-editor-editable {
  border-color: var(--dtc-theme-color-background-lighten);
  background-color: var(--dtc-theme-color-background-darken);
}

.dtc-fc-editor-element { color: var(--dtc-theme-color-element); }
.dtc-fc-editor-attribute { color: var(--dtc-theme-color-attribute); }
.dtc-fc-editor-string { color: var(--dtc-theme-color-string); }
</style>
