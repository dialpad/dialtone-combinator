<template>
  <div>
    <h1>Welcome to Dialtone Combinator!</h1>
    <TestBase />
    <dt-button
      class="d-d-block"
      @click="count++"
    >
      Increment: {{ count }}
    </dt-button>
  </div>
</template>

<script setup>
import TestBase from '@/components/test/test_base.vue';
import { DtButton } from '@dialpad/dialtone-vue';
import { ref } from 'vue';

const count = ref(0);
</script>

<style type="less" src="./assets/dialtone.less" />
