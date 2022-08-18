<template>
  <div>
    <dt-button-bar
      class="d-mb4"
      :value="background"
      @click="e => updateSettings('background', e)"
    >
      <template #theme>
        <div class="d-w16 d-h16 d-ba d-bc-black">
          <span class="d-fs10 d-ps-relative d-t6">T</span>
        </div>
      </template>
      <template #black>
        <div class="d-w16 d-h16 d-ba d-bc-black d-bgc-black-800" />
      </template>
      <template #white>
        <div class="d-w16 d-h16 d-ba d-bc-black d-bgc-white" />
      </template>
    </dt-button-bar>
    <dt-button-bar
      class="d-mb4"
      :value="positioning"
      @click="e => updateSettings('positioning', e)"
    >
      <template #native>
        <icon-left />
      </template>
      <template #center>
        <icon-center />
      </template>
    </dt-button-bar>
  </div>
</template>

<script setup>
import IconLeft from 'dialtone-icons/IconNotes';
import IconCenter from 'dialtone-icons/IconMenu';
import DtButtonBar from './renderer_button_bar';
import { SETTINGS_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  background: {
    type: String,
    required: true,
  },
  positioning: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([SETTINGS_UPDATE_EVENT]);

function updateSettings (setting, e) {
  emit(SETTINGS_UPDATE_EVENT, setting, e);
}
</script>

<script>
export default {
  name: 'DtcRendererMenu',
};
</script>
