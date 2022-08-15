<template>
  <div class="dtc-root d-d-grid d-ba d-bc-black-900 d-h100p">
    <div class="dtc-root__top d-grs1 d-bb d-bc-black-900">
      <dtc-renderer
        :component="component"
        :options="options"
        v-on="events"
      />
    </div>
    <div class="dtc-root__bottom d-grs2">
      <dtc-code-panel
        ref="codePanel"
        v-model:options="options"
        :info="info"
      />
    </div>
    <div class="dtc-root__sidebar d-grs1 d-gr2 d-bl d-bc-black-900">
      <dtc-option-bar
        v-model:options="options"
        :component="component"
        :info="info"
      />
    </div>
  </div>
</template>

<script setup>
import DtcOptionBar from './option_bar/option_bar';
import DtcRenderer from './renderer/renderer';
import DtcCodePanel from '@/src/components/code_panel/code_panel';

import { paramCase } from 'change-case';
import { computed, reactive, ref } from 'vue';
import { computedModel } from '@/src/lib/utils_vue';
import { getComponentInfo } from '@/src/lib/info';

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
});

const optionsRef = reactive({
  slots: {
    default: paramCase(props.component.name),
  },
  props: {},
  attributes: {},
  events: {},
  getMembers () {
    return {
      ...(this.props || {}),
      ...(this.attributes || {}),
    };
  },
});

const options = computedModel(
  optionsRef,
  (e, model) => e(model),
);

const info = computed(() => {
  return Object.freeze({
    ...initializeInfo(),
    getMembers () {
      return [
        ...(this.props || []),
        ...(this.attributes || []),
      ];
    },
  });
});

function initializeInfo () {
  const [info, defaults] = getComponentInfo(props.component);
  Object.keys(defaults).forEach(key => {
    setDefaults(defaults[key], optionsRef[key]);
  });
  return info;
}

function setDefaults (defaults, members) {
  Object.keys(defaults).forEach(key => {
    if (!(key in members)) {
      members[key] = defaults[key];
    }
  });
}

const codePanel = ref();

const eventHooks = ref([
  (event, value) => codePanel.value.trigger(event, value),
]);

const events = computed(() => {
  if (!info.value.events) { return {}; }
  return Object.fromEntries(
    info.value.events.map(({ name }) => {
      return [
        name,
        e => eventHooks.value.forEach(hook => hook(name, e)),
      ];
    }),
  );
});
</script>

<script>
export default {
  name: 'DtcCombinator',
};
</script>

<style lang="less">
@import "@/src/assets/themes/base.less";
.dtc-theme--light { @import "@/src/assets/themes/light.less"; }
.dtc-theme--dark { @import "@/src/assets/themes/dark.less"; }

.dtc-root {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.dtc-root > * {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}
</style>
