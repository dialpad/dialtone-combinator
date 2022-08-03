<template>
  <dtc-control-iterable
    :value="entries"
    :generate-item="generateEntry"
    @update:value="updateValue"
  >
    <template #default>
      <slot />
    </template>
    <template #prefix>
      {
    </template>
    <template #item="{ item, update }">
      <div class="d-d-flex">
        <dtc-control-string
          :value="item[0]"
          @update:value="e => updateEntry(e, item[1], update)"
        />
        <span class="d-px6 d-ps-relative d-t6">:</span>
        <dtc-control-dynamic
          :value="item[1]"
          @update:value="e => updateEntry(item[0], e, update)"
        />
      </div>
    </template>
    <template #suffix>
      }
    </template>
  </dtc-control-iterable>
</template>

<script setup>
import DtcControlString from './control_string';
import DtcControlIterable from './control_iterable';
import DtcControlDynamic from './control_dynamic';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed } from 'vue';
import { controlMap } from '@/src/lib/control';

const props = defineProps({
  value: {
    type: Object,
    default: () => controlMap.object.default,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const entries = computed(() => {
  return Object.entries(props.value);
});

function generateNextKey () {
  return Math.max(
    -1,
    ...Object.keys(props.value)
      .map(key => parseInt(key))
      .filter(key => !isNaN(key)),
  ) + 1;
}

function generateEntry () {
  return [generateNextKey(), null];
}

function updateEntry (key, value, updateItem) {
  updateItem([key, value]);
}

function updateValue (e) {
  emit(VALUE_UPDATE_EVENT, Object.fromEntries(e));
}
</script>

<script>
export default {
  name: 'DtcControlObject',
};
</script>
