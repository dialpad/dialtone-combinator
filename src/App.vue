<template>
  <Combinator
    :component-set="components"
    :component="components.DtButton"
    :code="'<dt-button>Hi</dt-button><dt-button>Ayo</dt-button>'"
  >
    Button
  </Combinator>
</template>

<script setup>
import * as components from '@dialpad/dialtone-vue';
import Combinator from './components/combinator.vue';
</script>

<style type="less" src="./assets/dialtone.less" />
