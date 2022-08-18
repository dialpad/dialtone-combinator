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
          v-if="showMenu"
          :background="background"
          :positioning="positioning"
          @update:settings="updateSettings"
        />
        <div>
          <dt-button
            class="d-mx4"
            importance="clear"
            :active="showMenu"
            @click="toggleSettings"
          >
            <template #icon>
              <icon-menu />
            </template>
          </dt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconMenu from 'dialtone-icons/IconMenuVertical';

import { DtButton } from '@dialpad/dialtone-vue';
import { computed, ref } from 'vue';
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

const background = computed(() => getSetting('background'));
const positioning = computed(() => getSetting('positioning'));

const backgroundColorMap = {
  theme: `dtc-theme__canvas`,
  black: 'd-bgc-black-900',
  white: 'd-bgc-white',
};

const showMenu = ref(false);

function toggleSettings () {
  showMenu.value = !showMenu.value;
}

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
 * @type {ComputedRef<Object>}
 */
const activeSlots = computed(() => {
  if (!props.options.slots) { return null; }
  return Object.fromEntries(
    Object.entries(props.options.slots).filter(([_, slot]) => slot),
  );
});

const bindings = computed(() => {
  return props.options.getMembers();
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
