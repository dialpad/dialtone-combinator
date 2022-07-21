<template>
  <div>
    <dt-recipe-combobox-with-popover
      ref="combobox"
      content-width="anchor"
      :list-aria-label="`${label} valid values`"
      @select="e => onUpdate(validValues[e])"
      @opened="onOpen"
    >
      <template #input="{ inputProps, onInput }">
        <dtc-control-string
          v-bind="inputProps"
          :label="label"
          :value="value"
          :warning="warning"
          @input="e => onInputInternal(e, onInput)"
        >
          <template #icon>
            <icon-collapse v-if="open" />
            <icon-expand v-else />
          </template>
        </dtc-control-string>
      </template>
      <template #list="{ listProps }">
        <ul
          class="d-p0"
          v-bind="listProps"
        >
          <dt-list-item
            v-for="(item, i) in validValues"
            :key="item"
            navigation-type="arrow-keys"
            role="option"
            @click="onSelectInternal(i)"
          >
            <template
              v-if="item === defaultValue"
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
import IconExpand from '%/IconArrowKeyboardDown.vue';
import IconCollapse from '%/IconArrowKeyboardUp.vue';
import { DtRecipeComboboxWithPopover, DtListItem, DtBadge } from '@dialpad/dialtone-vue';

import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed, ref } from 'vue';

const WARNING_MESSAGE = 'Unexpected value';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    default: undefined,
  },
  validValues: {
    type: Array,
    required: true,
  },
  defaultValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const warning = computed(() => {
  return !props.validValues.includes(props.value)
    ? WARNING_MESSAGE
    : undefined;
});

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

const open = ref(false);

function onOpen (e) {
  open.value = e;
}
</script>

<script>
export default {
  name: 'DtcControlSelection',
};
</script>
