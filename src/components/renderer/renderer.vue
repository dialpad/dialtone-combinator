<template>
  <div class="dtc-renderer d-of-auto d-d-flex d-jc-center d-ai-center d-w100p d-h100p">
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
</template>

<script setup>
import { computed } from 'vue';

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
});

const emit = defineEmits([
  'event',
]);

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
      console.log(name);
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
