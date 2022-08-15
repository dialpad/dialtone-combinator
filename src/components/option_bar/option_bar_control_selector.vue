<template>
  <dt-button-group>
    <template
      v-for="(selection, control) in selections"
      :key="control"
    >
      <template
        v-for="label in selection.labels"
        :key="label"
      >
        <span class="d-pr4">
          <dt-button
            class="d-px4 d-py1"
            importance="outlined"
            v-bind="getStyling(control)"
            @click="() => updateControl(control)"
          >
            {{ label }}
          </dt-button>
        </span>
      </template>
    </template>
  </dt-button-group>
</template>

<script setup>
import { DtButton, DtButtonGroup } from '@dialpad/dialtone-vue';
import { CONTROL_UPDATE_EVENT } from '@/src/lib/constants';
import { computed } from 'vue';

const props = defineProps({
  /**
   * Selected control.
   */
  selected: {
    type: String,
    required: true,
  },
  /**
   * Array of control selections.
   */
  controls: {
    type: Array,
    required: true,
  },
  /**
   * Array of valid types.
   */
  types: {
    type: Array,
    default: undefined,
  },
});

const emit = defineEmits([CONTROL_UPDATE_EVENT]);

const selections = computed(() => {
  return {
    ...Object.fromEntries(
      props.controls.map(control => {
        return [control, getSelection(control)];
      }),
    ),
  };
});

function getSelection (control) {
  switch (control) {
    case 'event': {
      const eventTypes = props.types;
      return {
        labels: [
          ...(eventTypes.map(type => {
            return type && type !== 'undefined'
              ? type
              : 'event';
          })),
        ],
      };
    }
    default: return {
      labels: [control],
    };
  }
}

function getStyling (control) {
  const isActive = control === props.selected;
  return {
    kind: isActive ? 'default' : 'muted',
    active: isActive,
  };
}

function updateControl (e) {
  if (props.selected === e) { return; }
  emit(CONTROL_UPDATE_EVENT, e);
}
</script>

<script>
export default {
  name: 'DtcOptionBarControlSelector',
};
</script>
