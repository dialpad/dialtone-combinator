<template>
  <div>
    <div>
      <slot />
    </div>
    <div class="d-fs20">
      [
    </div>
    <div class="d-pl16">
      <template
        v-for="(item, index) in value"
        :key="getId(index)"
      >
        <div class="d-d-flex">
          <dt-button
            class="d-p0 d-ps-relative d-t4"
            importance="clear"
            @click="() => removeItem(index)"
          >
            <IconRemove />
          </dt-button>
          <div class="d-fl-grow1">
            <dtc-control-dynamic
              :value="item"
              @update:value="(e) => updateItem(index, e)"
            />
          </div>
          <span class="d-as-flex-end d-fs28 d-ps-relative d-t8">,</span>
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
    <div class="d-fs20">
      ]
    </div>
  </div>
</template>

<script setup>
import IconAdd from '%/IconAddCircleOutline';
import IconRemove from '%/IconRemove';
import DtcControlDynamic from './control_dynamic';
import { DtButton } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { idMap } from '@/src/lib/utils_vue';

const props = defineProps({
  value: {
    type: Array,
    default: undefined,
  },
  args: {
    type: Object,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const { addId, removeId, getId } = idMap();

function updateItem (index, item) {
  const items = [...props.value];

  items.splice(index, 1, item);

  emit(VALUE_UPDATE_EVENT, items);
}

function addItem () {
  const items = [
    ...props.value,
    null,
  ];

  addId();

  emit(VALUE_UPDATE_EVENT, items);
}

function removeItem (index) {
  const items = [...props.value];

  items.splice(index, 1);

  removeId(index);

  emit(VALUE_UPDATE_EVENT, items);
}
</script>

<script>
export default {
  name: 'DtcControlArray',
};
</script>
