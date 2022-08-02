<template>
  <Combinator :component="component" />
</template>

<script setup>
import * as components from '@dialpad/dialtone-vue';
import Combinator from './components/combinator';
import { computed } from 'vue';

const component = computed(() => {
  const urlParams = new URLSearchParams(window.location.search);
  return components[urlParams.get('component')] ?? components.DtButton;
});
</script>

<style lang="less" src="./assets/dialtone.less" />
<style lang="less" src="./assets/transitions.less" />
