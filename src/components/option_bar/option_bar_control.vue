<template>
  <div>
    <div class="d-pb1">
      <template
        v-for="(badge, key) in badges"
        :key="key"
      >
        <span class="d-pr2">
          <dt-button
            class="d-p0"
            importance="clear"
            @click="() => updateControl(key)"
          >
            <dt-badge
              :text="badge.label"
              :color="getBadgeColor(key)"
            />
          </dt-button>
        </span>
      </template>
    </div>
    <component
      :is="controlComponent"
      :value="controlValue"
      v-bind="controlArgs"
      @update:value="updateValue"
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
      {{ controlDescription }}
    </div>
  </div>
</template>

<script setup>
import { DtBadge, DtButton } from '@dialpad/dialtone-vue';
import { CONTROL_UPDATE_EVENT, VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed } from 'vue';
import {
  controlMap,
  deserializeControlValue,
  getControlComponent,
  serializeControlValue,
} from '@/src/lib/control';
import { sentenceCase } from 'change-case';

const props = defineProps({
  control: {
    type: String,
    required: true,
  },
  validControls: {
    type: Array,
    required: true,
  },
  value: {
    type: undefined,
    required: true,
  },
  validValues: {
    type: Array,
    default: undefined,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: undefined,
  },
  types: {
    type: Array,
    default: undefined,
  },
  tags: {
    type: Object,
    default: undefined,
  },

  /**
   * Optional args to bind directly to the control.
   */
  args: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT, CONTROL_UPDATE_EVENT]);

const controlValue = computed(() => {
  return controlMap[props.control].serialize
    ? serializeControlValue(props.value)
    : props.value;
});

const controlDescription = computed(() => {
  return props.description
    ? sentenceCase(props.description)
    : null;
});

const controlComponent = computed(() => {
  return getControlComponent(props.control, controlArgs.value);
});

const controlArgs = computed(() => {
  return {
    validValues: props.validValues,
    tags: props.tags,
    ...props.args,
  };
});

const showModelTag = computed(() => {
  const tags = props.tags;
  return tags
    ? 'model' in tags
    : false;
});

const badges = computed(() => {
  return {
    ...Object.fromEntries(
      props.validControls.map(control => {
        return [control, getBadge(control)];
      }),
    ),
  };
});

function getBadge (control) {
  switch (control) {
    case 'event': {
      const eventType = props.types?.[0];
      return {
        label: eventType && eventType !== 'undefined'
          ? eventType
          : 'event',
      };
    }
    default: return {
      label: control,
    };
  }
}

function getBadgeColor (control) {
  return control === props.control
    ? 'purple-100'
    : 'base';
}

function updateValue (e) {
  const value = controlMap[props.control].serialize
    ? deserializeControlValue(e)
    : e;
  emit(VALUE_UPDATE_EVENT, value);
}

function updateControl (e) {
  emit(CONTROL_UPDATE_EVENT, e);
}
</script>

<script>
export default {
  name: 'DtcOptionBarControl',
};
</script>
