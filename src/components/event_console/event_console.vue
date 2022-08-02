<template>
  <div class="d-ws-pre-wrap">
    <template
      v-for="(entry, index) in entries"
      :key="entry.key"
    >
      <dtc-event-console-pair
        :name="entry.event"
        :value="index < cacheSize
          ? entry.value
          : undefined"
      >
        <template #separator>
          <IconArrowForward
            class="d-fs10 d-px6 d-ps-relative d-t2"
          />
        </template>
      </dtc-event-console-pair>
    </template>
  </div>
</template>

<script setup>
import IconArrowForward from '%/IconArrowForward';
import DtcEventConsolePair from '@/src/components/event_console/event_console_pair';

import { computed, ref } from 'vue';

defineProps({
  cacheSize: {
    type: Number,
    default: 10,
  },
});

const entries = ref([]);

let currentId = 0;
defineExpose({
  trigger (event, value) {
    entries.value.splice(0, 0, {
      event,
      value,
      key: currentId++,
    });
  },
  entryCount: computed(() => entries.value.length),
});
</script>

<script>
export default {
  name: 'DtcEventConsole',
};
</script>
