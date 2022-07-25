<template>
  <div>
    <div
      v-if="vModel"
      class="d-pb4"
    >
      <div class="d-d-inline">
        <dt-tooltip message="Supported by v-model">
          <template #anchor>
            <dt-badge color="black-700">
              v-model
            </dt-badge>
          </template>
        </dt-tooltip>
      </div>
    </div>
    <component
      :is="control"
      :label="label"
      :value="value"
      v-bind="args"
      @update:value="e => emit(VALUE_UPDATE_EVENT, e)"
    />
    <div class="d-description d-p1">
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import DtcControlEvent from '@/src/components/controls/control_event';
import DtcControlSlot from '@/src/components/controls/control_slot';
import DtcControlSelection from '@/src/components/controls/control_selection';
import DtcControlNumber from '@/src/components/controls/control_number';
import DtcControlString from '@/src/components/controls/control_string';
import DtcControlBoolean from '@/src/components/controls/control_boolean';
import DtcControlBase from '@/src/components/controls/control_base';
import { DtBadge, DtTooltip } from '@dialpad/dialtone-vue';

import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed, onMounted } from 'vue';
import { getPropLabel, hasModelTag } from '@/src/lib/utils_vue';

const props = defineProps({
  type: {
    type: String,
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

const vModel = computed(() => {
  const tags = props.tags;
  return tags
    ? hasModelTag(tags)
    : false;
});

const control = computed(() => {
  if (props.type === 'boolean') {
    return DtcControlBoolean;
  }

  if (props.args?.validValues) {
    return DtcControlSelection;
  }

  switch (props.type) {
    case 'event': return DtcControlEvent;
    case 'slot': return DtcControlSlot;
    case 'number': return DtcControlNumber;
    case 'string': return DtcControlString;
    default: return DtcControlBase;
  }
});

onMounted(() => {
  emit(VALUE_UPDATE_EVENT, props.value);
});
</script>

<script>
export default {
  name: 'DtcControl',
};
</script>
