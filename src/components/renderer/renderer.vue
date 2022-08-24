<template>
  <div class="dtc-renderer d-w100p d-h100p">
    <div
      class="d-of-auto d-d-flex"
      :class="{
        [backgroundColorMap[background]]: true,
        'd-jc-center': positioning === 'center',
        'd-ai-center': positioning === 'center',
        'd-ai-flex-start': positioning === 'native',
      }"
    >
      <component
        :is="component"
        v-bind="bindings"
        v-on="events"
      >
        <template
          v-for="(slot, name) in activeSlots"
          :key="name"
          #[name]
        >
          <div v-html="slot" />
        </template>
      </component>
    </div>
    <div class="d-d-flex d-jc-flex-end d-pe-none">
      <div class="d-d-flex d-pt4 d-pe-auto">
        <dtc-renderer-menu
          :theme="theme"
          :background="background"
          :positioning="positioning"
          @update:settings="updateSettings"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { SETTINGS_UPDATE_EVENT } from '@/src/lib/constants';
import DtcRendererMenu from '@/src/components/renderer/renderer_menu';

const props = defineProps({
  /**
   * Component to render.
   */
  component: {
    type: Object,
    required: true,
  },
  /**
   * Info data object.
   */
  info: {
    type: Object,
    required: true,
  },
  /**
   * Options data object.
   */
  options: {
    type: Object,
    required: true,
  },
  /**
   * Settings data object.
   */
  settings: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([
  SETTINGS_UPDATE_EVENT,
  'event',
]);

const theme = computed(() => {
  switch (background.value) {
    case 'black': return 'dark';
    case 'white': return 'light';
    default: return props.settings.root.theme;
  }
});
const background = computed(() => getSetting('background'));
const positioning = computed(() => getSetting('positioning'));

const backgroundColorMap = {
  black: 'd-bgc-black-900',
  white: 'd-bgc-white',
  theme: `dtc-theme__canvas`,
};

function getSetting (setting) {
  return props.settings.renderer[setting];
}

function updateSettings (setting, e) {
  emit(SETTINGS_UPDATE_EVENT, (model) => {
    model.renderer[setting] = e;
  });
}

/**
 * Filtered slots that contain content.
 *
 * @type {ComputedRef<object>}
 */
const activeSlots = computed(() => {
  if (!props.options.slots) { return null; }
  return Object.fromEntries(
    Object.entries(props.options.slots).filter(([_, slot]) => slot),
  );
});

const bindings = computed(() => {
  return props.options.bindings.get();
});

/**
 * Object containing events and their respective handlers.
 *
 * @type {ComputedRef<Object>}
 */
const events = computed(() => {
  if (!props.info.events) { return {}; }
  return Object.fromEntries(
    props.info.events.map(({ name }) => {
      return [
        name,
        e => emit('event', name, e),
      ];
    }),
  );
});
</script>

<script>
/**
 * The renderer is responsible for displaying the target component in its current state.
 */
export default {
  name: 'DtcRenderer',
};
</script>

<style>
.dtc-renderer {
  display: grid;
  grid-template-columns: 1fr;
}

.dtc-renderer > * {
  overflow: hidden;
  grid-area: 1 / 1;
}
</style>
