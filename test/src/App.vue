<template>
  <h1 class="d-ta-center">Exported Components</h1>
  <ul class="d-ls-reset">
    <dt-list-item
      v-for="(component) in Object.values(components)"
      :key="component.name"
      navigation-type="tab"
      role="menuitem"
    >
      {{ component.name }}
    </dt-list-item>
  </ul>
</template>

<script setup>
  import { DtListItem } from '@dialpad/dialtone-vue'
  import components from 'dialtone-sandbox';
</script>

<style type="less" src="@/assets/dialtone.less" />

