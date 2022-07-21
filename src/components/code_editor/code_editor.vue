<template>
  <div
    ref="editor"
    class="dtc-code-editor d-d-flex d-fl-grow1"
    :class="[
      `dtc-code-editor-scheme--${scheme}`,
    ]"
  >
    <div
      ref="code"
      class="d-fl-grow1"
    >
      <dtc-code-editor-element
        :tag-name="tagName"
        :self-closing="slotsEmpty"
      >
        <template #opening>
          <dtc-code-editor-attributes
            :info="info"
            :members="options.getMembers()"
            :verbose="verbose"
          />
        </template>
        <template #default>
          <div>
            <template
              v-for="(value, slot) in options.slots"
              :key="slot"
            >
              <dtc-code-editor-slot
                v-if="value"
                :name="slot"
                @update:options="e => emit(OPTIONS_UPDATE_EVENT, e)"
              >
                <span class="dtc-theme-popover">{{ value }}</span>
              </dtc-code-editor-slot>
            </template>
          </div>
        </template>
      </dtc-code-editor-element>
    </div>
    <dt-popover
      :class="[
        `dtc-theme--${theme}`,
        'd-ps-sticky',
        'd-t0',
      ]"
      content-class="dtc-theme__popover"
      transition="pop"
      :modal="false"
      :open="showCopyPopover"
    >
      <template #anchor="{ attrs }">
        <dt-button
          class="dtc-theme__button d-ps-sticky d-t0"
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
  </div>
</template>

<script setup>
import DtcCodeEditorAttributes from './code_editor_attributes.vue';
import DtcCodeEditorElement from './code_editor_element.vue';
import DtcCodeEditorSlot from './code_editor_slot.vue';
import IconContentCopy from '@dialpad/dialtone/lib/dist/vue/icons/IconContentCopy.vue';
import { DtButton, DtPopover } from '@dialpad/dialtone-vue';

import { OPTIONS_UPDATE_EVENT } from '@/src/lib/constants';
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
  theme: {
    type: String,
    required: true,
  },
  scheme: {
    type: String,
    required: true,
  },
  verbose: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits([
  OPTIONS_UPDATE_EVENT,
]);

const tagName = computed(() => paramCase(props.info.displayName));

const slotsEmpty = computed(() => {
  return Object.values(props.options.slots).every(slot => !slot);
});

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
@import "@/src/assets/themes/scheme/base.less";

.dtc-code-editor-scheme--mono {
  @import "@/src/assets/themes/scheme/mono.less";
}

.dtc-code-editor-scheme--highlight {
  @import "@/src/assets/themes/scheme/highlight.less";
}

.dtc-code-editor__editable {
  padding: var(--su2) var(--su4) var(--su2) var(--su4);
  border-radius: var(--su6);
  border: solid var(--su1);
  border-color: var(--dtc-theme-color-background-lighten);
  background-color: var(--dtc-theme-color-background-darken);
  outline: none;
}
</style>
