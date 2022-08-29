<template>
  <div ref="wrapper" />
</template>

<script setup>
import { computed, h, onMounted, onUpdated, ref, render, useSlots } from 'vue';
import { DtNotice } from '@dialpad/dialtone-vue';
import { capitalCase } from 'change-case';

const ERROR_MESSAGE = 'Error rendering component';

const props = defineProps({
  /**
   * Component to render.
   */
  component: {
    type: Object,
    required: true,
  },
  bindings: {
    type: undefined,
    required: true,
  },
  events: {
    type: undefined,
    required: true,
  },
});

const emit = defineEmits([
  'event',
]);

const slots = useSlots();

/**
 * Map object containing events and their respective handlers.
 *
 * @returns {ComputedRef<object>} Event map.
 */
const events = computed(() => {
  if (!props.events) { return {}; }
  return Object.fromEntries(
    props.events.map(({ name }) => {
      return [
        `on${capitalCase(name)}`,
        e => emit('event', name, e),
      ];
    }),
  );
});

onMounted(renderTarget);
onUpdated(renderTarget);

const wrapper = ref();
function nextContainer () {
  wrapper.value.replaceChildren();
  return wrapper.value.appendChild(document.createElement('div'));
}

/**
 * Need to render manually to catch DOM exception errors.
 */
function renderTarget () {
  const container = nextContainer();

  try {
    render(h(props.component, {
      ...props.bindings,
      ...events.value,
    }, slots), container);
  } catch (e) {
    console.warn('Rendering warning: \n', e);
    renderError(e, container);
  }
}

function renderError (exception, container) {
  render(h(DtNotice, {
    kind: 'error',
    hideClose: true,
    title: ERROR_MESSAGE,
  }, {
    default: () => exception.toString(),
  }), container);
}
</script>

<script>
/**
 * The renderer is responsible for displaying the target component in its current state.
 */
export default {
  name: 'DtcRendererTarget',
};
</script>
