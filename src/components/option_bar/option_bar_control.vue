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
      :value="value"
      :valid-values="validValues"
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
import { DtBadge, DtButton } from '@dialpad/dialtone-vue';

import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed, onMounted, ref } from 'vue';
import { getPropLabel, hasModelTag } from '@/src/lib/utils_vue';
import { controlMap, getControlComponent } from '@/src/lib/utils_control';
import { convert } from '@/src/lib/convert';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: undefined,
    default: undefined,
  },
  validValues: {
    type: Array,
    default: undefined,
  },
  validTypes: {
    type: Array,
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
   * Args to bind directly to the control.
   */
  args: {
    type: Object,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

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
    ? hasModelTag(tags)
    : false;
});

const selectedType = ref(getDefaultType());

function getDefaultType () {
  const value = props.value;
  let type = typeof value;

  switch (type) {
    case 'object': {
      type = Array.isArray(value)
        ? 'array'
        : 'object';
    }
  }

  return props.validTypes.includes(type)
    ? type
    : props.validTypes[0];
}

const control = computed(() => {
  return getControlComponent(selectedType.value, {
    validValues: props.validValues,
  });
});

function getBadge (type) {
  switch (type) {
    case 'event': return {
      label: getPropertyTypes()?.[0],
    };
    default: return {
      label: type,
    };
  }
}

function getBadgeColor (badgeType) {
  return badgeType === selectedType.value
    ? 'purple-100'
    : 'base';
}

function getPropertyTypes () {
  return props.properties?.map(property => {
    return property.type?.names;
  }).flat();
}

function updateSelectedType (type) {
  if (selectedType.value === type) { return; }
  const value = convert(selectedType.value, type, props.value) ?? controlMap[type]?.default;
  selectedType.value = type;
  updateValue(value);
}

function updateValue (e) {
  emit(VALUE_UPDATE_EVENT, e);
}

onMounted(() => {
  updateValue(props.value);
});
</script>

<script>
export default {
  name: 'DtcOptionBarControl',
};
</script>
