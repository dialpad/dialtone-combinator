<template>
  <dt-popover
    :class="`dtc-theme--${theme}`"
    content-class="dtc-theme__popover"
    transition="fade"
    placement="top-end"
    initial-focus-element="dialog"
  >
    <template #anchor="{ attrs }">
      <dt-button
        class="dtc-theme__button"
        v-bind="attrs"
      >
        <template #icon>
          <IconSettings />
        </template>
      </dt-button>
    </template>
    <template #content>
      <div>
        <section class="d-p8">
          <dt-radio-group
            name="theme-radio-group"
            legend="Theme"
            :value="theme"
            @input="e => emit('update:theme', e)"
          >
            <dt-radio value="light">
              Light
            </dt-radio>
            <dt-radio value="dark">
              Dark
            </dt-radio>
          </dt-radio-group>
        </section>
        <section class="d-p8">
          <dt-radio-group
            name="scheme-radio-group"
            legend="Scheme"
            :value="scheme"
            @input="e => emit('update:scheme', e)"
          >
            <dt-radio value="mono">
              Mono
            </dt-radio>
            <dt-radio value="highlight">
              Highlight
            </dt-radio>
          </dt-radio-group>
        </section>
        <section class="d-p8">
          <dt-checkbox
            :checked="verbose"
            @input="e => emit('update:verbose', e)"
          >
            Verbose
          </dt-checkbox>
        </section>
      </div>
    </template>
  </dt-popover>
</template>

<script setup>
import IconSettings from 'icons/IconSettings';

import {
  DtButton,
  DtPopover,
  DtRadioGroup,
  DtRadio,
  DtCheckbox,
} from '@dialpad/dialtone-vue';

defineProps({
  theme: {
    type: String,
    required: true,
  },
  scheme: {
    type: String,
    required: true,
  },
  verbose: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits([
  'update:theme',
  'update:scheme',
  'update:verbose',
]);
</script>

<script>
export default {
  name: 'DtcCodePanelSettings',
};
</script>
