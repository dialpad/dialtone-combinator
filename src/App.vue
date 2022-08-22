<template>
  <Combinator
    :component="component"
    :variants="variants"
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

const variants = computed(() => {
  switch (component.value.name) {
    case 'DtButton': {
      return {
        variant: {
          props: {
            circle: {
              description: 'Variant changed value',
              defaultValue: true,
              newProperty: 123,
            },
            iconPosition: {
              description: 'Variant changed description',
            },
          },
          events: {
            poggers: {
              something: 123,
            },
          },
        },
      };
    }
    default: return {};
  }
});

</script>

<style lang="less" src="./assets/dialtone.less" />
<style lang="less" src="./assets/transitions.less" />
