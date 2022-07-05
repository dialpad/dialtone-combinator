<template>
  <div>
    <div>This is a test component that uses Dialtone Vue components</div>
    <dt-button>Button</dt-button>
    <dt-checkbox label="Checkbox" />
  </div>
</template>

<script setup>
import { DtButton, DtCheckbox } from '@dialpad/dialtone-vue';
</script>

<script>
export default {
  name: 'DtcTestDialtoneVue',
};
</script>
