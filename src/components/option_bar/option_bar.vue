<template>
  <div class="dtc-option-bar d-as-stretch d-of-y-auto d-w100p">
    <ul class="d-ls-reset">
      <dtc-option-bar-section
        v-if="info.slots"
        heading="Slots"
      >
        <dtc-option-bar-members
          :component="component"
          :members="info.slots"
          :values="options.slots"
          :type-selector="() => ['slot']"
          @update:member="updateSlots"
        />
      </dtc-option-bar-section>
      <dtc-option-bar-section
        v-if="info.props"
        heading="Props"
      >
        <dtc-option-bar-members
          :component="component"
          :members="info.props"
          :values="options.props"
          :type-selector="prop => getPropTypes(prop.types)"
          @update:member="updateProps"
        />
      </dtc-option-bar-section>
      <dtc-option-bar-section
        v-if="info.attributes"
        heading="Attributes"
      >
        <dtc-option-bar-members
          :component="component"
          :members="info.attributes"
          :values="options.attributes"
          :type-selector="attribute => attribute.types"
          @update:member="updateAttributes"
        />
      </dtc-option-bar-section>
      <dtc-option-bar-section
        v-if="info.events"
        heading="Events"
      >
        <dtc-option-bar-members
          :component="component"
          :members="info.events"
          :values="options.events"
          :type-selector="() => ['event']"
        />
      </dtc-option-bar-section>
    </ul>
  </div>
</template>

<script setup>
import DtcOptionBarMembers from './option_bar_members';
import DtcOptionBarSection from './option_bar_section';

import { OPTIONS_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  component: {
    type: Object,
    required: true,
  },
  options: {
    type: Object,
    required: true,
  },
  info: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits([OPTIONS_UPDATE_EVENT]);

function getPropTypes (types) {
  return [
    ...types,
    'null',
  ];
}

function updateMember (memberType, { member, value }) {
  emit(OPTIONS_UPDATE_EVENT, (options) => {
    options[memberType][member] = value;
  });
}

function updateSlots (e) { updateMember('slots', e); }
function updateProps (e) { updateMember('props', e); }
function updateAttributes (e) { updateMember('attributes', e); }
</script>

<script>
export default {
  name: 'DtcOptionBar',
};
</script>

<style>
  .dtc-option-bar {
    background-color: #FCFCFC;
  }
</style>
