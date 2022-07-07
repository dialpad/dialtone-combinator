<template>
  <div>
    <h1 class="d-ta-center">
      Exported Components
    </h1>
    <ul class="d-ls-reset d-ta-center">
      <router-link
        v-for="(component) in Object.values(components)"
        :key="component.name"
        :to="component.name"
      >
        <dt-list-item
          navigation-type="tab"
          role="menuitem"
        >
          {{ component.name }}
        </dt-list-item>
      </router-link>
    </ul>
  </div>
</template>

<script setup>
import { DtListItem } from '@dialpad/dialtone-vue';
import { RouterLink } from 'vue-router';
import * as components from 'dialtone-combinator';
</script>

<style lang="less" src="./assets/dialtone.less" />
