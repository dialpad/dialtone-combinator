<template>
  <div
    class="d-r-none d-ws-pre-wrap d-fl-grow1"
    type="textarea"
    disabled
  >
    {{ text }}
  </div>
</template>

<script setup>
import { defineExpose, ref } from 'vue';
import { flatten } from '@/src/lib/utils';
import { stringify } from 'javascript-stringify';

const text = ref('');

defineExpose({
  trigger (event, value) {
    text.value = `${event}: ${stringify(
      flatten(value),
      undefined,
      2,
      {
        maxDepth: 1,
      },
    )}\n` + text.value;
  },
});
</script>

<script>
export default {
  name: 'DtcEventConsole',
};
</script>
