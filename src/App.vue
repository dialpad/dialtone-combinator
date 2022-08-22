<template>
  <Combinator
    :component="component"
    :variants="{
      variant: {
        props: {
          circle: {
            description: '123',
            newProperty: 123,
            defaultValue: true,
          },
          'iconPosition': {
            description: 'ayo',
          },
        },
        events: {
          poggers: {
            something: 123,
          },
        },
      },
      somethingElse: {
        props: {
          circle: {
            wowowNewProp: 'abc',
          },
        },
      },
    }"
  />
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
