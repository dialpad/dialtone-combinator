<template>
  <div
    v-if="component && options"
    class="dtc-root d-d-grid d-h100p"
  >
    <div class="dtc-root__top d-grs1 d-ba d-bc-black">
      <dtc-renderer
        :component="component"
        :options="options"
        v-on="events"
      />
    </div>
    <div class="dtc-root__bottom d-grs2">
      <dtc-code-panel
        ref="codePanel"
        v-model:options="options"
        :info="info"
      />
    </div>
    <div class="dtc-root__sidebar d-grs1 d-gr2">
      <dtc-option-bar
        v-model:options="options"
        :component="component"
        :info="info"
      />
    </div>
  </div>
</template>

<script setup>
import DtcOptionBar from './option_bar/option_bar.vue';
import DtcRenderer from './renderer/renderer.vue';
import DtcCodePanel from '@/src/components/code_panel/code_panel';

// TODO: Temporary for testing
import documentation from '@/../dialtone-vue/dist/component-documentation.json';

import { paramCase } from 'change-case';
import { computed, reactive, ref } from 'vue';
import { computedModel } from '@/src/lib/utils';

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
});

const info = computed(() => {
  return documentation.find(componentInfo => componentInfo.displayName === props.component.name);
});

console.log(info.value);

const options = computedModel(
  reactive({
    slots: {
      default: paramCase(props.component.name),
    },
    props: {},
    attributes: {},
    events: {},
    directives: {},
    getMembers () {
      return {
        ...this.props,
        ...this.attributes,
      };
    },
  }),
  (e, model) => e(model),
);

const codePanel = ref();

const eventHooks = ref([
  (event, value) => codePanel.value.trigger(event, value),
]);

const events = computed(() => {
  return Object.fromEntries(
    info.value.events.map(({ name }) => {
      return [
        name,
        e => eventHooks.value.forEach(hook => hook(name, e)),
      ];
    }),
  );
});

</script>

<script>
export default {
  name: 'DtcCombinator',
};
</script>

<style lang="less">
@import "@/src/assets/themes/base.less";
.dtc-theme--light { @import "@/src/assets/themes/light.less"; }
.dtc-theme--dark { @import "@/src/assets/themes/dark.less"; }

.dtc-root {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
}

.dtc-root > * {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}
</style>
