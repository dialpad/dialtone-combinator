<template>
  <div class="dtc-option-bar d-as-stretch d-w100p d-bgc-orange-200">
    <section class="d-p16">
      <h2>Slots</h2>
      <dtc-option-bar-members
        :component="component"
        :values="options.slots"
        :members="info.slots"
        control-name="slot"
        @update:member="({member, value}) => emit(OPTIONS_UPDATE_EVENT, (options) => {
          options.slots[member.name] = value;
        })"
      />
    </section>
    <section class="d-p16">
      <h2>Props</h2>
      <dtc-option-bar-members
        :component="component"
        :values="options.props"
        :members="info.props"
        @update:member="({member, value}) => emit(OPTIONS_UPDATE_EVENT, (options) => {
          options.props[member.name] = value;
        })"
      />
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
        @input="e => emitUpdate(e)"
      >
        disabled
      </dt-checkbox>
    </section>
  </div>
</template>

<script setup>
import DtcOptionBarMembers from '@/src/components/option_bar/option_bar_members.vue';
import { DtCheckbox } from '@dialpad/dialtone-vue';
import { OPTIONS_UPDATE_EVENT } from '@/src/constants';

defineProps({
  component: {
    type: Object,
  },
  options: {
    type: Object,
  },
  info: {
    type: Object,
  },
});

const emit = defineEmits([OPTIONS_UPDATE_EVENT]);

function emitUpdate (args) {
  emit(OPTIONS_UPDATE_EVENT, args);
}
</script>

<script>
export default {
  name: 'DtcOptionBar',
};
</script>
