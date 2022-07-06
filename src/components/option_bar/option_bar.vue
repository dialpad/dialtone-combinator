<template>
  <div class="dtc-option-bar">
    <div class="d-p16">
      <h2>Slots</h2>
      <dt-input
        label="default"
        class="d-r-none"
        type="textarea"
        :value="options.slots.default"
        @input="e => emitUpdate(options => {
          options.slots.default = e;
        })"
      />
    </div>
    <div class="d-p16">
      <h2>Props</h2>
      <dt-checkbox
        :checked="options.props.active"
        @input="e => emitUpdate(options => {
          options.props.active = e;
        })"
      >
        active
      </dt-checkbox>
    </div>
    <div class="d-p16">
      <h2>Events</h2>
      <ul>
        <li>click</li>
        <li>focusin</li>
        <li>focusout</li>
      </ul>
    </div>
    <div class="d-p16">
      <h2>Attributes</h2>
      <dt-checkbox
        :checked="options.attributes.disabled"
        @input="e => emitUpdate(options => {
          options.attributes.disabled = e;
        })"
      >
        disabled
      </dt-checkbox>
    </div>
  </div>
</template>

<script setup>
import { DtCheckbox, DtInput } from '@dialpad/dialtone-vue';

defineProps({
  component: {
    type: Object,
  },
  options: {
    type: Object,
  },
});

const emit = defineEmits(['update-options']);

function emitUpdate (args) {
  emit('update-options', args);
}
</script>

<script>
export default {
  name: 'DtcOptionBar',
};
</script>
