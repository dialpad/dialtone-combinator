<template>
  <dtc-event-console-lazy-load
    @toggle="onToggle"
  >
    <template #prefix>
      [
    </template>
    <template #default>
      <span>[</span>
      <template
        v-for="(field, key) in value"
        :key="key"
      >
        <dtc-event-console-pair
          :name="key.toString()"
          :value="field"
        />
      </template>
      <span>]</span>
    </template>
    <template #suffix>
      ]
    </template>
  </dtc-event-console-lazy-load>
</template>

<script setup>
import DtcEventConsolePair from '@/src/components/event_console/event_console_pair';
import DtcEventConsoleLazyLoad from '@/src/components/event_console/event_console_lazy_load';

const props = defineProps({
  value: {
    type: Object,
    required: true,
  },
});

function onToggle (e) {
  if (e) {
    console.log(props.value);
  }
}
</script>

<script>
export default {
  name: 'DtcEventConsoleArray',
};
</script>
