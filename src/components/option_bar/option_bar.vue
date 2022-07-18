<template>
  <div class="dtc-option-bar d-as-stretch d-w100p d-bgc-orange-200">
    <section class="d-p16">
      <h2>Slots</h2>
      <dtc-option-bar-members
        :component="component"
        :members="info.slots"
        :values="options.slots"
        :control-selector="_ => 'slot'"
        @update:member="({member, value}) => emit(OPTIONS_UPDATE_EVENT, (options) => {
          options.slots[member.name] = value;
        })"
      />
    </section>
    <section class="d-p16">
      <h2>Props</h2>
      <dtc-option-bar-members
        :component="component"
        :members="info.props"
        :values="options.props"
        :control-selector="prop => prop.type.name"
        @update:member="({member, value}) => emit(OPTIONS_UPDATE_EVENT, (options) => {
          options.props[member.name] = value;
        })"
      />
    </section>
    <section class="d-p16">
      <h2>Attributes</h2>
      <dtc-option-bar-members
        :component="component"
        :members="[
          {
            name: 'disabled',
            type: {
              name: 'boolean',
            },
          },
        ]"
        :values="options.attributes"
        :control-selector="attribute => attribute.type.name"
        @update:member="({member, value}) => emit(OPTIONS_UPDATE_EVENT, (options) => {
          options.attributes[member.name] = value;
        })"
      />
    </section>
    <section class="d-p16">
      <h2>Events</h2>
      <dtc-option-bar-members
        :component="component"
        :values="options.events"
        :members="info.events"
        :control-selector="_ => 'event'"
        @update:member="({member, value}) => emit(OPTIONS_UPDATE_EVENT, (options) => {
          options.props[member.name] = value;
        })"
      />
    </section>
  </div>
</template>

<script setup>
import DtcOptionBarMembers from '@/src/components/option_bar/option_bar_members.vue';
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
</script>

<script>
export default {
  name: 'DtcOptionBar',
};
</script>
