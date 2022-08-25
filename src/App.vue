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
          slots: {
            icon: {
              description: 'Variant slot description',
            },
          },
          props: {
            circle: {
              description: 'Variant changed value and locked',
              defaultValue: true,
              newProperty: 123,
              lockControl: true,
            },
            iconPosition: {
              description: 'Variant changed description',
            },
            importance: {
              hideControl: true,
            },
            link: {
              description: 'The `importance` control that is usually above is hidden here',
            },
            labelClass: {
              defaultValue: [2],
              lockControl: true,
            },
          },
          events: {
            focusin: {
              type: {
                names: ['customvariantevent'],
              },
              description: 'I have a custom variant event type',
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
