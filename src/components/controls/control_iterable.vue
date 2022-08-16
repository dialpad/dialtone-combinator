<template>
  <div>
    <div>
      <slot />
    </div>
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
                name="item"
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
import IconAdd from 'dialtone-icons/IconAddCircleOutline';
import IconRemove from 'dialtone-icons/IconRemove';
import { DtButton, DtListItem } from '@dialpad/dialtone-vue';
import { DEFAULT_PREFIX, VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { idMap } from '@/src/lib/utils_vue';
import { getUniqueString } from '@/src/lib/utils';

const props = defineProps({
  value: {
    type: Array,
    required: true,
  },

  /**
   * Function that returns an item to append to list.
   */
  generateItem: {
    type: Function,
    required: true,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const prefix = getUniqueString(`${DEFAULT_PREFIX}-control-iterable`);

/**
 * Id map is used to keep v-for keys in order when adding and removing new items.
 */
const { addId, removeId, getId } = idMap(`${prefix}-item`);

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
/**
 * Control that is used to provide an interface to modify generic iterable values.
 * The important parts of the functionality are abstracted to the parent to allow
 * reuse of this control for any iterable value type.
 */
export default {
  name: 'DtcControlIterable',
};
</script>
