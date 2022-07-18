<template>
  <div
    ref="editor"
    class="dtc-code-editor d-d-flex d-as-stretch d-of-auto d-p16 d-w100p"
    :class="[
      `dtc-theme-${theme}`,
      `dtc-code-editor--scheme-${scheme}`,
    ]"
  >
    <div
      ref="code"
      class="d-fl-grow1"
    >
      <dtc-code-editor-element
        :tag-name="tagName"
        :self-closing="!options.slots.default"
      >
        <template #opening>
          <dtc-code-editor-attributes
            :info="info"
            :members="options.getMembers()"
          />
        </template>
        <template #default>
          <dtc-code-editor-slot
            v-if="options.slots.default"
            name="default"
            @update:options="e => emit('update:options', e)"
          >
            <span class="dtc-theme-popover">{{ options.slots.default }}</span>
          </dtc-code-editor-slot>
        </template>
      </dtc-code-editor-element>
    </div>
    <div class="d-d-flex d-fd-column d-ai-flex-end d-jc-space-between">
      <dt-popover
        :class="`dtc-theme-${theme}`"
        content-class="dtc-code-editor-popover"
        transition="pop"
        :modal="false"
        :open="showCopyPopover"
      >
        <template #anchor="{ attrs }">
          <dt-button
            class="dtc-theme__button"
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
import DtcCodeEditorAttributes from './code_editor_attributes.vue';
import DtcCodeEditorElement from './code_editor_element.vue';
import DtcCodeEditorSlot from './code_editor_slot.vue';
import DtcCodeEditorSettings from './code_editor_settings.vue';
import IconContentCopy from '@dialpad/dialtone/lib/dist/vue/icons/IconContentCopy.vue';
import { DtButton, DtPopover } from '@dialpad/dialtone-vue';

import settings from '@/src/settings.json';
import { CODE_EDITOR_SCHEME_KEY, CODE_EDITOR_THEME_KEY } from '@/src/constants';
import { cachedRef } from '@/src/lib/utils';
import { ref, computed } from 'vue';
import { paramCase } from 'change-case';

const props = defineProps({
  options: {
    type: Object,
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  'update:options',
]);

const tagName = computed(() => paramCase(props.info.displayName));

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
.dtc-code-editor {
  color: var(--dtc-theme-color-foreground);
  background-color: var(--dtc-theme-color-background);
}

.dtc-code-editor--scheme-mono {
  @import "@/src/assets/themes/scheme_code_editor/default.less";
}

.dtc-code-editor--scheme-highlight {
  @import "@/src/assets/themes/scheme_code_editor/highlight.less";
}

.dtc-code-editor__popover {
  color: var(--dtc-theme-color-background);
  background-color: var(--dtc-theme-color-foreground);
}

.dtc-code-editor__popover .d-radio__label {
  color: var(--dtc-theme-color-background);
}

.dtc-code-editor__editable {
  padding: var(--su2) var(--su4) var(--su2) var(--su4);
  border-radius: var(--su6);
  border: solid var(--su1);
  border-color: var(--dtc-theme-color-background-lighten);
  background-color: var(--dtc-theme-color-background-darken);
  outline: none;
}

.dtc-code-editor__element { color: var(--dtc-theme-color-element); }
.dtc-code-editor__attribute { color: var(--dtc-theme-color-attribute); }
.dtc-code-editor__string { color: var(--dtc-theme-color-string); }
.dtc-code-editor__value { color: var(--dtc-theme-color-value); }
</style>