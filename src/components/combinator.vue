<template>
  <div
    :class="`dtc-root
    dtc-theme--${settings.root.theme}
    d-d-grid d-ba d-bc-black-900 d-h100p`"
  >
    <div class="dtc-root__top d-grs1 d-bb d-bc-black-900">
      <dtc-renderer
        v-model:settings="settings"
        :component="component"
        :info="info"
        :options="options"
        @event="(event, value) => triggerEvent(event, value)"
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
          <dtc-settings-menu v-model:settings="settings" />
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
import DtcSettingsMenu from './settings_menu/settings_menu';

import { paramCase } from 'change-case';
import { computed, reactive, ref } from 'vue';
import { cachedRef, computedModel } from '@/src/lib/utils_vue';
import { getComponentInfo } from '@/src/lib/info';
import {
  SETTINGS_SCHEME_KEY,
  SETTINGS_THEME_KEY,
  SETTINGS_VERBOSE_KEY,
  SETTINGS_BACKGROUND_KEY,
  SETTINGS_POSITIONING_KEY,
} from '@/src/lib/constants';
import defaultSettings from '@/src/settings.json';

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

function triggerEvent (event, value) {
  codePanel.value.trigger(event, value);
}

const settings = computedModel(
  reactive({
    root: {
      theme: cachedRef(SETTINGS_THEME_KEY, defaultSettings.root['default-theme']),
    },
    renderer: {
      positioning: cachedRef(SETTINGS_POSITIONING_KEY, defaultSettings.renderer['default-positioning']),
      background: cachedRef(SETTINGS_BACKGROUND_KEY, defaultSettings.renderer['default-background']),
    },
    code: {
      scheme: cachedRef(SETTINGS_SCHEME_KEY, defaultSettings.code['default-scheme']),
      verbose: cachedRef(SETTINGS_VERBOSE_KEY, defaultSettings.code['default-verbose']),
    },
  }),
  (e, model) => e(model),
);
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
