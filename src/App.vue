<template>
  <Combinator :component="DtButton">
    Button
  </Combinator>
</template>

<script setup>
import { DtButton } from '@dialpad/dialtone-vue';
import Combinator from './components/combinator.vue';
</script>

<style type="less" src="./assets/dialtone.less" />
