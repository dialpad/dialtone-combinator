<template>
  <div class="d-p16">
    <div>Hi I am a test component!</div>
    <dt-button>Dialtone Button!</dt-button>
    <div>End test component</div>
  </div>
</template>

<script>
  import { DtButton } from '@dialpad/dialtone-vue';

  export default {
    name: "TestComponent",
    components: {
      DtButton
    }
  }
</script>