<template>
  <div
    class="dtc-code-editor d-d-flex d-as-stretch d-p16 d-w100p"
    :class="[
      `dtc-code-editor-theme-${theme}`,
      `dtc-scheme-${scheme}`,
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
          :slots="options?.slots"
          @update-options="e => emit('update-options', e)"
        />
      </dtc-code-editor-element>
    </div>
    <div>
      <dt-popover
        transition="fade"
        :modal="false"
        :open="showPopover"
      >
        <template #anchor="{ attrs }">
          <dt-button
            v-bind="attrs"
            icon="IconContentCopy"
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
    </div>
  </div>
</template>

<script setup>
import DtcCodeEditorElement from './code_editor_element.vue';
import DtcCodeEditorSlot from './code_editor_slot.vue';

import IconContentCopy from '@dialpad/dialtone/lib/dist/vue/icons/IconContentCopy.vue';
import { DtButton, DtPopover } from '@dialpad/dialtone-vue';
import { ref } from 'vue';

const code = ref();

const showPopover = ref(false);

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
  scheme: {
    type: String,
  },
  theme: {
    type: String,
  },
});

const emit = defineEmits(['update-options']);

async function copy () {
  await navigator.clipboard.writeText(code.value.innerText);
  showPopover.value = true;
  await new Promise(resolve => setTimeout(resolve, 100));
  showPopover.value = false;
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

.fade-enter-active { transition: opacity 100ms ease-in }
.fade-leave-active { transition: opacity 1250ms ease-out; }

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style lang="less">
.dtc-code-editor { @import "@/src/assets/themes/code_editor/default.less"; }
.dtc-code-editor-theme-highlight { @import "@/src/assets/themes/code_editor/highlight.less"; }

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
