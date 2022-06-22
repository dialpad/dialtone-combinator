<template>
  <h1>Welcome to Dialtone Sandbox!</h1>
  <TestComponent />
  <dt-button class="d-d-block" @click="count++">Increment: {{ count }}</dt-button>
</template>

<script setup>
  import TestComponent from '@/components/test_component.vue';
  import { DtButton } from '@dialpad/dialtone-vue';
  import { ref } from "vue";

  const count = ref(0);
</script>

<style type="less" src="/src/assets/main.less" />
