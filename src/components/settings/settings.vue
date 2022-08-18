<template>
  <dt-popover
    :class="`dtc-theme--${settings.theme}`"
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
            :value="settings.theme"
            @input="e => updateSetting('theme', e)"
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
            :value="settings.scheme"
            @input="e => updateSetting('scheme', e)"
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
            :checked="settings.verbose"
            @input="e => updateSetting('verbose', e)"
          >
            Verbose
          </dt-checkbox>
        </section>
      </div>
    </template>
  </dt-popover>
</template>

<script setup>
import IconSettings from 'dialtone-icons/IconSettings';

import {
  DtButton,
  DtPopover,
  DtRadioGroup,
  DtRadio,
  DtCheckbox,
} from '@dialpad/dialtone-vue';

defineProps({
  settings: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:settings']);

function updateSetting (setting, e) {
  emit('update:settings', [setting, e]);
}
</script>

<script>
export default {
  name: 'DtcSettings',
};
</script>
