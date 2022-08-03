<template>
  <div>
    <div class="d-pb1">
      <template
        v-for="(badge, type) in badges"
        :key="type"
      >
        <span class="d-pr2">
          <dt-button
            class="d-p0"
            importance="clear"
            @click="() => updateSelectedType(type)"
          >
            <dt-badge
              :text="badge.label"
              :color="getBadgeColor(type)"
            />
          </dt-button>
        </span>
      </template>
    </div>
    <component
      :is="control"
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

import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed, onMounted } from 'vue';
import { getPropLabel } from '@/src/lib/utils_vue';
import { controlMap, getControlComponent } from '@/src/lib/control';
import { convert } from '@/src/lib/convert';
import { UNSET } from '@/src/lib/utils';
import { sentenceCase } from 'change-case';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  selectedType: {
    type: String,
    required: true,
  },
  validTypes: {
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

const emit = defineEmits([VALUE_UPDATE_EVENT, 'update:type']);

const controlValue = computed(() => {
  return (props.value === undefined && control.value === DtcControlNull)
    ? UNSET
    : props.value;
});

const controlDescription = computed(() => {
  return props.description
    ? sentenceCase(props.description)
    : null;
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

const badges = computed(() => {
  return {
    ...Object.fromEntries(
      props.validTypes.map(type => {
        return [type, getBadge(type)];
      }),
    ),
  };
});

const showModelTag = computed(() => {
  const tags = props.tags;
  return tags
    ? 'model' in tags
    : false;
});

const control = computed(() => {
  return getControlComponent(props.selectedType, {
    validValues: props.validValues,
  });
});

function getBadge (type) {
  switch (type) {
    case 'event': return {
      label: getPropertyTypes()?.[0] ?? 'event',
    };
    default: return {
      label: type,
    };
  }
}

function getBadgeColor (badgeType) {
  return badgeType === props.selectedType
    ? 'purple-100'
    : 'base';
}

function getPropertyTypes () {
  return props.properties?.map(property => {
    return property.type?.names;
  }).flat();
}

function updateSelectedType (type) {
  if (props.selectedType === type) { return; }

  let value;
  try {
    value = convert(props.selectedType, type, props.value);
  } catch {
    console.warn(`${props.name}: Unable to convert ${props.selectedType} to ${type}`);
  }

  updateType(type, value ?? controlMap[type]?.default);
}

function updateValue (e) {
  const value = e === UNSET
    ? undefined
    : e;

  emit(VALUE_UPDATE_EVENT, value);
}

function updateType (e, value) {
  emit('update:type', e, value);
}

onMounted(() => {
  updateValue(controlValue.value);
});
</script>

<script>
export default {
  name: 'DtcOptionBarControl',
};
</script>
