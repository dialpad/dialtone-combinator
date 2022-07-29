<template>
  <div>
    <div class="d-fs18">
      <slot name="prefix" />
    </div>
    <div class="d-pl16">
      <template
        v-for="(item, index) in value"
        :key="getId(index)"
      >
        <div class="d-d-flex d-my1">
          <div class="d-fl-grow1">
            <dt-list-item
              navigation-type="tab"
            >
              <slot
                :item="item"
                :update="(e) => updateItem(index, e)"
              />
            </dt-list-item>
          </div>
          <dt-button
            class="d-p0"
            importance="clear"
            size="xs"
            @click="() => removeItem(index)"
          >
            <IconRemove />
          </dt-button>
        </div>
      </template>
      <div>
        <dt-button
          class="d-p0 d-mt8"
          importance="clear"
          @click="addItem"
        >
          <icon-add />
        </dt-button>
      </div>
    </div>
    <div class="d-fs18">
      <slot name="suffix" />
    </div>
  </div>
</template>

<script setup>
import IconAdd from '%/IconAddCircleOutline';
import IconRemove from '%/IconRemove';
import { DtButton, DtListItem } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { idMap } from '@/src/lib/utils_vue';

const props = defineProps({
  value: {
    type: Array,
    default: undefined,
  },
  generateItem: {
    type: Function,
    default: () => null,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const { addId, removeId, getId } = idMap('dtc-control-iterable-item');

function updateItem (index, item) {
  const items = [...props.value];

  items.splice(index, 1, item);

  updateValue(items);
}

function addItem () {
  const items = [
    ...props.value,
    props.generateItem(),
  ];

  addId();

  updateValue(items);
}

function removeItem (index) {
  const items = [...props.value];

  items.splice(index, 1);

  removeId(index);

  updateValue(items);
}

function updateValue (e) {
  emit(VALUE_UPDATE_EVENT, e);
}
</script>

<script>
export default {
  name: 'DtcControlIterable',
};
</script>
