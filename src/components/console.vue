<template>
  <dt-input
    :value="text"
    class="d-r-none"
    type="textarea"
    disabled
  />
</template>

<script setup>
import { DtInput } from '@dialpad/dialtone-vue';
import { defineExpose, ref } from 'vue';
import { flatten } from '@/src/lib/utils';
import { stringify } from 'javascript-stringify';

const text = ref('');

defineExpose({
  trigger (event, value) {
    text.value += `${event}: ${stringify(
      flatten(value),
      undefined,
      2,
      {
        maxDepth: 1,
      },
    )}\n`;
  },
});
</script>

<script>
export default {
  name: 'DtcConsole',
};
</script>
