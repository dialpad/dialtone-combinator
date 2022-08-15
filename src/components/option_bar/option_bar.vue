<template>
  <div class="dtc-option-bar d-as-stretch d-of-y-auto d-w100p">
    <ul class="d-ls-reset">
      <dtc-option-bar-section
        v-if="info.slots"
        heading="Slots"
      >
        <dtc-option-bar-member-group
          :component="component"
          :members="info.slots"
          :values="options.slots"
          :control-selector="() => ['slot']"
          @update:member="updateSlots"
        />
      </dtc-option-bar-section>
      <dtc-option-bar-section
        v-if="info.props"
        heading="Props"
      >
        <dtc-option-bar-member-group
          :component="component"
          :members="info.props"
          :values="options.props"
          :control-selector="prop => getPropTypes(prop.type.names)"
          @update:member="updateProps"
        />
      </dtc-option-bar-section>
      <dtc-option-bar-section
        v-if="info.attributes"
        heading="Native HTML Attributes"
      >
        <dtc-option-bar-member-group
          :component="component"
          :members="info.attributes"
          :values="options.attributes"
          :control-selector="attribute => attribute.type.names"
          @update:member="updateAttributes"
        />
      </dtc-option-bar-section>
      <dtc-option-bar-section
        v-if="info.events"
        heading="Events"
      >
        <dtc-option-bar-member-group
          :component="component"
          :members="info.events"
          :values="options.events"
          :control-selector="() => ['event']"
        />
      </dtc-option-bar-section>
    </ul>
  </div>
</template>

<script setup>
import DtcOptionBarMemberGroup from './option_bar_member_group';
import DtcOptionBarSection from './option_bar_section';

import { OPTIONS_UPDATE_EVENT } from '@/src/lib/constants';

defineProps({
  /**
   * Component to render.
   */
  component: {
    type: Object,
    required: true,
  },
  /**
   * Options data object.
   */
  options: {
    type: Object,
    required: true,
  },
  /**
   * Info data object.
   */
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
/**
 * The option bar is responsible for providing a user interface
 * to interact and change the state of the target component.
 */
export default {
  name: 'DtcOptionBar',
};
</script>

<style>
  .dtc-option-bar {
    background-color: #FCFCFC;
  }
</style>
