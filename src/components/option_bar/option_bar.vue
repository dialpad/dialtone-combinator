<template>
  <div class="dtc-option-bar d-as-stretch d-of-y-auto d-w100p d-bgc-orange-200">
    <ul class="d-ls-reset">
      <dtc-option-bar-section
        heading="Slots"
      >
        <dtc-option-bar-members
          :component="component"
          :members="info.slots"
          :values="options.slots"
          :control-selector="() => 'slot'"
          @update:member="updateSlots"
        />
      </dtc-option-bar-section>
      <dtc-option-bar-section
        heading="Props"
      >
        <dtc-option-bar-members
          :component="component"
          :members="info.props"
          :values="options.props"
          :control-selector="prop => prop.type.name"
          @update:member="updateProps"
        />
      </dtc-option-bar-section>
      <dtc-option-bar-section
        heading="Attributes"
      >
        <dtc-option-bar-members
          :component="component"
          :members="attributes"
          :values="options.attributes"
          :control-selector="attribute => attribute.type.name"
          @update:member="updateAttributes"
        />
      </dtc-option-bar-section>
      <dtc-option-bar-section
        heading="Events"
      >
        <dtc-option-bar-members
          :component="component"
          :values="options.events"
          :members="info.events"
          :control-selector="() => 'event'"
          @update:member="updateEvents"
        />
      </dtc-option-bar-section>
    </ul>
  </div>
</template>

<script setup>
import DtcOptionBarMembers from './option_bar_members.vue';
import DtcOptionBarSection from './option_bar_section.vue';

import { OPTIONS_UPDATE_EVENT } from '@/src/lib/constants';
import { computed } from 'vue';
import { parseAttributeTag } from '@/src/lib/parse';

const props = defineProps({
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

// Get HTML attributes to display from custom attribute tag
const attributes = computed(() => {
  return props.info.tags.attributes.map(attribute => {
    // eslint-disable-next-line no-unused-vars
    const [attributeName, attributeType] = parseAttributeTag(attribute.description);
    return {
      name: attributeName,
      type: {
        name: attributeType,
      },
    };
  });
});

function updateMember (memberType, { member, value }) {
  emit(OPTIONS_UPDATE_EVENT, (options) => {
    options[memberType][member.name] = value;
  });
}

function updateSlots (e) { updateMember('slots', e); }
function updateProps (e) { updateMember('props', e); }
function updateAttributes (e) { updateMember('attributes', e); }
function updateEvents (e) { updateMember('events', e); }
</script>

<script>
export default {
  name: 'DtcOptionBar',
};
</script>
