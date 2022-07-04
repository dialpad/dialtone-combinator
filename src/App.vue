<template>
  <Combinator
    :component-set="components"
    :component="components.DtButton"
  >
    Button
  </Combinator>
</template>

<script setup>
import * as components from '@dialpad/dialtone-vue';
import Combinator from './components/combinator.vue';
</script>

<style type="less" src="./assets/dialtone.less" />
