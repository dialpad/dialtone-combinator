<template>
  <div class="dtc-root d-d-grid d-ba d-bc-black-900 d-h100p">
    <div class="dtc-root__top d-grs1 d-bb d-bc-black-900">
      <dtc-renderer
        :component="component"
        :options="options"
        v-on="triggerEvent"
      />
    </div>
    <div class="dtc-root__bottom d-grs2">
      <dtc-code-panel
        ref="codePanel"
        v-model:options="options"
        :info="info"
        :settings="settings"
      >
        <template #overlay>
          <dtc-settings v-model:settings="settings" />
        </template>
      </dtc-code-panel>
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
import DtcCodePanel from './code_panel/code_panel';
import DtcSettings from './settings/settings';

import { paramCase } from 'change-case';
import { computed, reactive, ref } from 'vue';
import { cachedRef, computedModel } from '@/src/lib/utils_vue';
import { getComponentInfo } from '@/src/lib/info';
import { CODE_EDITOR_SCHEME_KEY, CODE_EDITOR_THEME_KEY, CODE_EDITOR_VERBOSE_KEY } from '@/src/lib/constants';
import settingsData from '@/src/settings.json';

const props = defineProps({
  /**
   * Target component.
   */
  component: {
    type: Object,
    required: true,
  },
});

function initializeInfo () {
  const [info, defaults] = getComponentInfo(props.component);
  Object.keys(defaults).forEach(key => {
    setDefaults(defaults[key], optionsModel[key]);
  });
  return info;
}

const optionsModel = reactive({
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

/**
 * The options data object is the main reactive object that allows interactivity with the target component.
 *
 * @type {WritableComputedRef<Object>}
 */
const options = computedModel(
  optionsModel,
  (e, model) => e(model),
);

/**
 * Container for all extended component information for the target component.
 *
 * @type {ComputedRef<Object>}
 */
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

/**
 * Sets the values for a given 'options' member group with the provided defaults.
 *
 * @param defaults default key-value map
 * @param memberGroup options member group
 */
function setDefaults (defaults, memberGroup) {
  Object.keys(defaults).forEach(key => {
    if (!(key in memberGroup)) {
      memberGroup[key] = defaults[key];
    }
  });
}

const codePanel = ref();

/**
 * List of hooks that are triggered on emit of a target component event.
 * @type {Ref<Array>}
 */
const eventHooks = ref([
  (event, value) => codePanel.value.trigger(event, value),
]);

/**
 * Object containing events and their respective handlers.
 *
 * @type {ComputedRef<Object>}
 */
const triggerEvent = computed(() => {
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

const settings = computedModel(
  reactive({
    theme: cachedRef(CODE_EDITOR_THEME_KEY, settingsData['code-editor']['default-theme']),
    scheme: cachedRef(CODE_EDITOR_SCHEME_KEY, settingsData['code-editor']['default-scheme']),
    verbose: cachedRef(CODE_EDITOR_VERBOSE_KEY, false),
  }),
  function (e, model) {
    const [key, value] = e;
    model[key] = value;
  });
</script>

<script>
/**
 * The root component that facilitates input and output with its child components.
 * Holds the two central data objects 'info' and 'options'.
 */
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
