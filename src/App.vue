<template>
  <div
    class="dtc-preview d-d-flex d-fd-column d-ai-center d-pt16 d-pb64 d-w100p"
    :class="`d-bgc-${background}`"
  >
    <dtc-button-bar
      class="d-ps-absolute d-t0 d-r0"
      value="orange"
      @click="updateBackground"
    >
      <template #orange-200>
        <div class="d-w16 d-h16 d-ba d-bc-black d-bgc-orange-200" />
      </template>
      <template #black-800>
        <div class="d-w16 d-h16 d-ba d-bc-black d-bgc-black-800" />
      </template>
      <template #white>
        <div class="d-w16 d-h16 d-ba d-bc-black d-bgc-white" />
      </template>
    </dtc-button-bar>
    <div class="dtc-preview-bar d-mb64">
      <dt-select-menu
        :options="options"
        :value="component.name"
        label="Target Component"
        @input="updateComponent"
      />
    </div>
    <div class="dtc-preview-combinator d-as-stretch d-d-flex d-hmn0">
      <Combinator
        :component="component"
        :variants="variants"
      />
    </div>
  </div>
</template>

<script setup>
import * as modules from '@dialpad/dialtone-vue';
import Combinator from './components/combinator';
import { computed, markRaw, onMounted, ref } from 'vue';
import { DIALTONE_PREFIX } from '@/src/lib/constants';
import { DtSelectMenu } from '@dialpad/dialtone-vue';
import DtcButtonBar from '@/src/components/tools/button_bar';

const components = computed(() => {
  return Object.fromEntries(Object.entries(modules).filter(([exportName, exportValue]) => {
    return typeof (exportValue) === 'object' && exportName.toLowerCase().startsWith(DIALTONE_PREFIX);
  }));
});

const options = computed(() => {
  return Object.entries(components.value).map(([componentName]) => {
    return { value: componentName, label: componentName };
  });
});

function getComponentFromHash (hash) {
  return markRaw(components.value[hash.substring(1)] ?? components.value.DtButton);
}

const component = ref(getComponentFromHash(window.location.hash));

function updateComponent (e) {
  window.location.hash = e;
}

onMounted(() => {
  addEventListener('hashchange', () => {
    component.value = getComponentFromHash(window.location.hash);
  });
});

const background = ref('orange-200');

function updateBackground (e) {
  background.value = e;
}

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

<style>
  .dtc-preview {
    padding-left: var(--su128);
    padding-right: var(--su128);
  }
</style>
