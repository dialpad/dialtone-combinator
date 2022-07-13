<template>
  <div class="dtc-option-bar d-as-stretch d-w100p d-bgc-orange-200">
    <section class="d-p16">
      <h2>Slots</h2>
      <dt-input
        label="default"
        class="d-r-none"
        type="textarea"
        spellcheck="false"
        :value="options.slots.default"
        @input="e => emitUpdate(options => {
          options.slots.default = e;
        })"
      />
    </section>
    <section class="d-p16">
      <h2>Props</h2>
      <dt-checkbox
        :checked="options.props.active"
        @input="e => emitUpdate(options => {
          options.props.active = e;
        })"
      >
        active
      </dt-checkbox>
    </section>
    <section class="d-p16">
      <h2>Events</h2>
      <ul>
        <li>click</li>
        <li>focusin</li>
        <li>focusout</li>
      </ul>
    </section>
    <section class="d-p16">
      <h2>Attributes</h2>
      <dt-checkbox
        :checked="options.attributes.disabled"
        @input="e => emitUpdate(options => {
          options.attributes.disabled = e;
        })"
      >
        disabled
      </dt-checkbox>
    </section>
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
