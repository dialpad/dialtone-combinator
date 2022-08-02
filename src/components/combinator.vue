<template>
  <div class="dtc-root d-d-grid d-ba d-bc-black-900 d-h100p">
    <div class="dtc-root__top d-grs1 d-bb d-bc-black-900">
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
    <div class="dtc-root__sidebar d-grs1 d-gr2 d-bl d-bc-black-900">
      <dtc-option-bar
        v-model:options="options"
        :component="component"
        :info="info"
      />
    </div>
  </div>
</template>

<script setup>
import DtcOptionBar from './option_bar/option_bar';
import DtcRenderer from './renderer/renderer';
import DtcCodePanel from '@/src/components/code_panel/code_panel';

// TODO: Temporary for testing
import documentation from '@/src/assets/component-documentation.json';

import { paramCase } from 'change-case';
import { computed, reactive, ref } from 'vue';
import { computedModel } from '@/src/lib/utils_vue';

const props = defineProps({
  component: {
    type: Object,
    required: true,
  },
});

const info = computed(() => {
  const componentInfo = documentation.find(componentInfo => componentInfo.displayName === props.component.name);
  const model = componentInfo.props.find(componentProp => {
    const tags = componentProp.tags;
    return tags
      ? 'model' in tags
      : false;
  });
  if (model) {
    model.name = model.tags.model[0]?.description;
  }
  return componentInfo;
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
  grid-template-rows: repeat(2, 1fr);
}

.dtc-root > * {
  display: flex;
  align-items: flex-start;
  overflow: hidden;
}
</style>
