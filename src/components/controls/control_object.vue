<template>
  <dtc-control-iterable
    :value="entries"
    :disabled="disabled"
    :generate-item="generateItem"
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
        <div
          data-qa="dtc-control-object-item-key"
        >
          <dtc-control-string
            :value="item[0]"
            :disabled="disabled"
            @update:value="e => updateEntry(e, item[1], update)"
          />
        </div>
        <span class="d-px6 d-ps-relative d-t6">:</span>
        <div
          data-qa="dtc-control-object-item-value"
        >
          <dtc-control-dynamic
            :value="serializeControlValue(item[1])"
            :disabled="disabled"
            @update:value="e => updateEntry(item[0], deserializeControlValue(e), update)"
          />
        </div>
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
import { serializeControlValue, deserializeControlValue } from '@/src/lib/control';

const props = defineProps({
  value: {
    type: Object,
    default: () => ({}),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const entries = computed(() => {
  return props.value ? Object.entries(props.value) : [];
});

let currentId = 0;
function generateNextId () {
  const keys = Object.keys(props.value);

  while (keys.includes(currentId.toString())) {
    currentId++;
  }

  return currentId;
}

function generateItem () {
  return [generateNextId().toString(), undefined];
}

function updateEntry (key, value, updateItem) {
  updateItem([key, value]);
}

function updateValue (e) {
  emit(VALUE_UPDATE_EVENT, Object.fromEntries(e));
}
</script>

<script>
/**
 * Control that is used to provide functionality to manipulate objects.
 */
export default {
  name: 'DtcControlObject',
};
</script>
