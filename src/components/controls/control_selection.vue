<template>
  <div>
    <dt-recipe-combobox-with-popover
      ref="combobox"
      content-width="anchor"
      :list-aria-label="`${label} valid values`"
      @select="e => onUpdate(values[e])"
    >
      <template #input="{ inputProps, onInput }">
        <dtc-control-string
          v-bind="inputProps"
          :label="label"
          :value="value"
          @input="e => onInputInternal(e, onInput)"
        />
      </template>
      <template #list="{ listProps }">
        <ul
          class="d-p0"
          v-bind="listProps"
        >
          <dt-list-item
            v-for="(item, i) in values"
            :key="item"
            navigation-type="arrow-keys"
            role="option"
            @click="onSelectInternal(i)"
          >
            <template
              v-if="isDefaultPropValue(item, defaultValue)"
              #right
            >
              <dt-badge color="purple-500">
                default
              </dt-badge>
            </template>
            {{ item }}
          </dt-list-item>
        </ul>
      </template>
    </dt-recipe-combobox-with-popover>
  </div>
</template>

<script setup>
import DtcControlString from './control_string.vue';
import { DtRecipeComboboxWithPopover, DtListItem, DtBadge } from '@dialpad/dialtone-vue';

import { isDefaultPropValue } from '@/src/lib/utils';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { ref } from 'vue';

defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
  values: {
    type: Array,
    required: true,
  },
  defaultValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const combobox = ref();

function onSelectInternal (i) {
  combobox.value.onSelect(i);
}

function onInputInternal (value, onInput) {
  onInput(value);
  onUpdate(value);
}

function onUpdate (value) {
  emit(VALUE_UPDATE_EVENT, value);
}
</script>

<script>
export default {
  name: 'DtcControlSelection',
};
</script>
