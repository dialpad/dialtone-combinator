<template>
  <div>
    <h4>{{ name }}</h4>
    <dt-recipe-combobox-with-popover
      :list-aria-label="`${name} valid values`"
    >
      <template #input="{ inputProps }">
        <dt-input
          v-bind="inputProps"
          :value="value"
        />
      </template>
      <template #list="{ listProps }">
        <ol v-bind="listProps">
          <dt-list-item
            v-for="(item) in items"
            :key="item"
            navigation-type="arrow-keys"
            role="option"
            @click="onSelect(item)"
          >
            {{ item }}
          </dt-list-item>
        </ol>
      </template>
    </dt-recipe-combobox-with-popover>
  </div>
</template>

<script setup>
import { DtRecipeComboboxWithPopover, DtListItem, DtInput } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/constants';

defineProps({
  name: {
    type: String,
  },
  value: {
    type: undefined,
  },
  items: {
    type: Array,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

function onSelect (item) {
  console.log(item);
  emit(VALUE_UPDATE_EVENT, item);
}
</script>

<script>
export default {
  name: 'DtcControlEnum',
};
</script>
