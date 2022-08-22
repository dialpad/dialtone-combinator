<template>
  <div
    class="dtc-combinator d-h100p"
    :class="`dtc-theme--${settings.root.theme}`"
  >
    <div class="d-mb6 d-ba d-bar8 d-of-hidden">
      <dtc-header
        :component="component"
        :variants="variants"
        :selected-variant="selectedVariant"
        @update:variant="updateVariant"
      />
    </div>
    <div
      :class="`dtc-root
        dtc-root--sidebar-${settings.root.sidebar}
        d-ba d-bar8
        d-of-hidden
        d-d-grid d-h100p`"
    >
      <div class="dtc-root__top">
        <dtc-renderer
          v-model:settings="settings"
          :component="component"
          :info="info"
          :options="options"
          @event="(event, value) => triggerEvent(event, value)"
        />
      </div>
      <div class="dtc-root__bottom d-bt">
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
      <div class="dtc-root__sidebar">
        <dtc-option-bar
          v-model:options="options"
          :component="component"
          :info="info"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import DtcOptionBar from './option_bar/option_bar';
import DtcRenderer from './renderer/renderer';
import DtcCodePanel from './code_panel/code_panel';
import DtcSettingsMenu from './settings_menu/settings_menu';
import DtcHeader from '@/src/components/header/header';

import { enumerateGroups } from '@/src/lib/utils';
import { computed, reactive, ref } from 'vue';
import { cachedRef, computedModel } from '@/src/lib/utils_vue';
import { getComponentInfo } from '@/src/lib/info';
import {
  SETTINGS_SCHEME_KEY,
  SETTINGS_THEME_KEY,
  SETTINGS_VERBOSE_KEY,
  SETTINGS_BACKGROUND_KEY,
  SETTINGS_POSITIONING_KEY,
  SETTINGS_SIDEBAR_KEY,
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
  variants: {
    type: Object,
    default: null,
  },
});

const selectedVariant = ref('default');

function updateVariant (e) {
  selectedVariant.value = e;
}

/**
 * Gets a new instantiation of an info object.
 * Merges info from selected variant to the info object.
 *
 * @return {Object}
 */
function initializeInfo () {
  const info = getComponentInfo(props.component);

  const variantInfo = props.variants?.[selectedVariant.value];

  if (variantInfo) {
    Object.entries(variantInfo).forEach(([memberGroup, members]) => {
      Object.entries(members).forEach(([memberName, member]) => {
        const infoMember = info[memberGroup].find(infoMember => infoMember.name === memberName);
        if (infoMember) {
          Object.assign(infoMember, member);
        }
      });
    });
  }

  return info;
}

/**
 * Container for all extended component information for the target component.
 *
 * @type {ComputedRef<Object>}
 */
const info = computed(() => {
  return Object.freeze({
    ...initializeInfo(),
    members: {
      enumerate (handler) {
        enumerateGroups(handler, {
          slots: info.value.slots,
          props: info.value.props,
          attributes: info.value.attributes,
          events: info.value.events,
        });
      },
    },
    bindings: {
      get () {
        const bindings = [];
        this.enumerate((_, binding) => bindings.push(binding));
        return bindings;
      },
      enumerate (handler) {
        enumerateGroups(handler, {
          props: info.value.props,
          attributes: info.value.attributes,
        });
      },
    },
  });
});

/**
 * Gets the values for a given 'options' member group with the provided defaults.
 */
function getDefaultOptions (info) {
  const options = {};
  info.members.enumerate((memberGroup, member) => {
    options[memberGroup] = options[memberGroup] || {};
    options[memberGroup][member.name] = member.defaultValue;
  });
  return options;
}

/**
 * The options data object is the main reactive object that allows interactivity with the target component.
 *
 * @type {WritableComputedRef<Object>}
 */
const options = computedModel(
  computed(() => {
    return reactive({
      ...getDefaultOptions(info.value),
      bindings: {
        get () {
          const bindings = [];
          this.enumerate((_, binding) => bindings.push(binding));
          return Object.fromEntries(bindings);
        },
        enumerate (handler) {
          enumerateGroups(handler, {
            props: Object.entries(options.value.props),
            attributes: Object.entries(options.value.attributes),
          });
        },
      },
    });
  }),
  (e, model) => e(model),
);

const settings = computedModel(
  computed(() => {
    return reactive({
      root: {
        theme: cachedRef(SETTINGS_THEME_KEY, defaultSettings.root['default-theme']),
        sidebar: cachedRef(SETTINGS_SIDEBAR_KEY, defaultSettings.root['default-sidebar']),
      },
      renderer: {
        positioning: cachedRef(SETTINGS_POSITIONING_KEY, defaultSettings.renderer['default-positioning']),
        background: cachedRef(SETTINGS_BACKGROUND_KEY, defaultSettings.renderer['default-background']),
      },
      code: {
        scheme: cachedRef(SETTINGS_SCHEME_KEY, defaultSettings.code['default-scheme']),
        verbose: cachedRef(SETTINGS_VERBOSE_KEY, defaultSettings.code['default-verbose']),
      },
    });
  }),
  (e, model) => e(model),
);

const codePanel = ref();

function triggerEvent (event, value) {
  codePanel.value.trigger(event, value);
}
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
  grid-template-rows: repeat(2, 1fr);
}

.dtc-root--sidebar-right {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);

  .dtc-root__bottom {
    grid-row-start: 2;
  }

  .dtc-root__sidebar {
    grid-row: span 2 / span 2;
    border-left: var(--su1) solid currentColor;
  }
}

.dtc-root--sidebar-left {
  grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);

  .dtc-root__top {
    grid-row-start: 1;
    grid-column-start: 2;
  }

  .dtc-root__bottom {
    grid-row-start: 2;
    grid-column-start: 2;
  }

  .dtc-root__sidebar {
    grid-column-start: 1;
    grid-row: span 2 / span 2;
    border-right: var(--su1) solid currentColor;
  }
}

.dtc-root > * {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}
</style>
