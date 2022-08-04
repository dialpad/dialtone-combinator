<template>
  <div>
    <div class="d-pb1">
      <template
        v-for="(badge, badgeControl) in badges"
        :key="badgeControl"
      >
        <span class="d-pr2">
          <dt-button
            class="d-p0"
            importance="clear"
            @click="() => updateType(badgeControl)"
          >
            <dt-badge
              :text="badge.label"
              :color="getBadgeColor(badgeControl)"
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
import DtcControlNull from '@/src/components/controls/control_null';

import { TYPE_UPDATE_EVENT, VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed } from 'vue';
import { getPropLabel } from '@/src/lib/utils_vue';
import { getControlComponent } from '@/src/lib/control';
import { UNSET } from '@/src/lib/utils';
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
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: undefined,
  },
  tags: {
    type: Object,
    default: undefined,
  },
  properties: {
    type: Object,
    default: undefined,
  },
  /**
   * Optional args to bind directly to the control.
   */
  args: {
    type: Object,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT, TYPE_UPDATE_EVENT]);

const controlValue = computed(() => {
  return (props.value === undefined && controlComponent.value === DtcControlNull)
    ? UNSET
    : props.value;
});

const controlDescription = computed(() => {
  return props.description
    ? sentenceCase(props.description)
    : null;
});

const controlComponent = computed(() => {
  return getControlComponent(props.control, controlArgs);
});

const controlArgs = computed(() => {
  return {
    validValues: props.validValues,
    ...props.args,
  };
});

const label = computed(() => {
  return getPropLabel(props.name, props.tags);
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
    case 'event': return {
      label: getPropertyTypes()?.[0] ?? 'event',
    };
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

function getPropertyTypes () {
  return props.properties?.map(property => {
    return property.type?.names;
  }).flat();
}

function updateValue (e) {
  const value = e === UNSET
    ? undefined
    : e;

  emit(VALUE_UPDATE_EVENT, value);
}

function updateType (e) {
  emit(TYPE_UPDATE_EVENT, e);
}
</script>

<script>
export default {
  name: 'DtcOptionBarControl',
};
</script>
