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
    text.value = `${event}\n${text.value}`;
  },
});

// eslint-disable-next-line no-unused-vars
function stringifyValue (value) {
  return stringify(
    flatten(value),
    undefined,
    2,
    {
      maxDepth: 1,
    },
  );
}
</script>

<script>
export default {
  name: 'DtcEventConsole',
};
</script>
