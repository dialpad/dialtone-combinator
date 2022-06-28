<template>
  <Combinator :component="DtButton">
    Button
  </Combinator>
</template>

<script setup>
import Combinator from '@/components/combinator.vue';
import { DtButton } from '@dialpad/dialtone-vue';
</script>

<style type="less" src="./assets/dialtone.less" />
