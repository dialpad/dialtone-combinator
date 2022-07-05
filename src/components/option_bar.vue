<template>
  <div class="dtc-option-bar">
    <div class="d-p16">
      <h2>Props</h2>
      <dt-checkbox
        :checked="options.props.active"
        @input="e => options.props.active = e"
      >
        active
      </dt-checkbox>
    </div>
    <div class="d-p16">
      <h2>Slots</h2>
      <dt-input
        label="default"
        class="d-r-none"
        type="textarea"
        :value="options.slots.default"
        @input="e => options.slots.default = e"
      />
    </div>
    <div class="d-p16">
      <h2>Events</h2>
      <ul>
        <li>click</li>
        <li>focusin</li>
        <li>focusout</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { paramCase } from 'change-case';
import { DtCheckbox, DtInput } from '@dialpad/dialtone-vue';
import { reactive } from 'vue';

const props = defineProps({
  component: {
    type: Object,
    default: null,
  },
});

const options = reactive({
  props: {
    active: true,
  },
  slots: {
    default: paramCase(props.component.name),
  },
});

defineExpose({
  props: options.props,
  slots: options.slots,
});
</script>

<script>
export default {
  name: 'DtcOptionBar',
};
</script>
