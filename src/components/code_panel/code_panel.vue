<template>
  <div class="dtc-code-panel d-w100p d-h100p">
    <dtc-selector
      selected="code"
    >
      <template #code>
        <dtc-code-editor
          :info="info"
          :options="options"
          :theme="theme"
          :scheme="scheme"
          :verbose="verbose"
          @update:options="e => emit(OPTIONS_UPDATE_EVENT, e)"
        />
      </template>
      <template #console>
        <dtc-event-console
          ref="eventConsole"
        />
      </template>
    </dtc-selector>
    <div class="d-d-flex d-ai-flex-end d-jc-flex-end d-pe-none">
      <div class="d-pr32 d-pb16 d-pe-auto">
        <dtc-code-panel-settings
          v-model:theme="theme"
          v-model:scheme="scheme"
          v-model:verbose="verbose"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import DtcSelector from '@/src/components/selector';
import DtcCodePanelSettings from '@/src/components/code_panel/code_panel_settings';
import DtcEventConsole from '@/src/components/event_console';
import DtcCodeEditor from '@/src/components/code_editor/code_editor';

import {
  CODE_EDITOR_SCHEME_KEY,
  CODE_EDITOR_THEME_KEY,
  CODE_EDITOR_VERBOSE_KEY,
  OPTIONS_UPDATE_EVENT,
} from '@/src/lib/constants';
import { ref } from 'vue';
import { cachedRef } from '@/src/lib/utils';
import settings from '@/src/settings.json';

defineProps({
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
  OPTIONS_UPDATE_EVENT,
]);

const eventConsole = ref();
defineExpose({
  trigger: (event, value) => eventConsole.value.trigger(event, value),
});

const theme = cachedRef(CODE_EDITOR_THEME_KEY, settings['code-editor']['default-theme']);
const scheme = cachedRef(CODE_EDITOR_SCHEME_KEY, settings['code-editor']['default-scheme']);
const verbose = cachedRef(CODE_EDITOR_VERBOSE_KEY, false);

</script>

<script>
export default {
  name: 'DtcCodePanel',
};
</script>

<style>
.dtc-code-panel {
  display: grid;
  grid-template-columns: 1fr;
}

.dtc-code-panel > * {
  overflow: hidden;
  grid-area: 1 / 1;
}
</style>
