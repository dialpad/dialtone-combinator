<template>
  <div class="d-as-stretch d-of-auto d-w100p">
    <dtc-selector
      selected="code"
    >
      <template #code>
        <slot name="code" />
      </template>
      <template #console>
        <slot name="console" />
      </template>
    </dtc-selector>
  </div>
</template>

<script setup>

import DtcSelector from '@/src/components/selector';
</script>

<script>
export default {
  name: 'DtcCodePanel',
};
</script>
