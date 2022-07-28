<template>
  <div>
    <div class="d-pb1">
      <template
        v-for="type in types"
        :key="type"
      >
        <span class="d-pr2">
          <dt-badge :text="type" />
        </span>
      </template>
    </div>
    <component
      :is="control"
      :value="value"
      v-bind="args"
      @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
    >
      <span>
        <span class="d-pr6">
          {{ label }}
        </span>
        <span
          v-if="showModelTag"
          class="d-ps-relative d-b2"
        >
          <dt-badge
            text="v-model"
            color="black-700"
          />
        </span>
      </span>
    </component>
    <div class="d-description d-p1">
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import DtcControlObject from '@/src/components/controls/control_object';
import DtcControlArray from '@/src/components/controls/control_array';
import DtcControlEvent from '@/src/components/controls/control_event';
import DtcControlSlot from '@/src/components/controls/control_slot';
import DtcControlCombo from '@/src/components/controls/control_combo';
import DtcControlNumber from '@/src/components/controls/control_number';
import DtcControlString from '@/src/components/controls/control_string';
import DtcControlBoolean from '@/src/components/controls/control_boolean';
import DtcControlBase from '@/src/components/controls/control_base';
import { DtBadge } from '@dialpad/dialtone-vue';

import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed, onMounted } from 'vue';
import { getPropLabel, hasModelTag } from '@/src/lib/utils_vue';

const props = defineProps({
  types: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  value: {
    type: undefined,
    default: undefined,
  },
  description: {
    type: String,
    default: undefined,
  },
  tags: {
    type: Object,
    default: undefined,
  },
  args: {
    type: Object,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const label = computed(() => {
  return getPropLabel(props.name, props.tags);
});

const showModelTag = computed(() => {
  const tags = props.tags;
  return tags
    ? hasModelTag(tags)
    : false;
});

const control = computed(() => {
  const types = props.types;

  if (types.includes('event')) { return DtcControlEvent; }
  if (types.includes('slot')) { return DtcControlSlot; }
  if (types.includes('array')) { return DtcControlArray; }
  if (types.includes('object')) { return DtcControlObject; }

  if (types.includes('number')) { return DtcControlNumber; }
  if (types.includes('boolean')) { return DtcControlBoolean; }
  if (types.includes('string')) {
    return props.args?.validValues
      ? DtcControlCombo
      : DtcControlString;
  }

  return DtcControlBase;
});

onMounted(() => {
  emit(VALUE_UPDATE_EVENT, props.value);
});
</script>

<script>
export default {
  name: 'DtcOptionBarControl',
};
</script>
