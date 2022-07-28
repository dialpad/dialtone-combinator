<template>
  <div>
    <div>
      <slot />
    </div>
    <dtc-control-iterable
      :value="entries"
      :generate-item="generateEntry"
      @update:value="updateValue"
    >
      <template #prefix>
        {
      </template>
      <template #default="{ item, update }">
        <div>
          <dtc-control-string
            :value="item[0]"
            @update:value="e => updateEntryKey(e, item[1], update)"
          />
          <span>:</span>
          <dtc-control-dynamic
            :value="item[1]"
            @update:value="e => updateEntryValue(e, item[0], update)"
          />
        </div>
      </template>
      <template #suffix>
        }
      </template>
    </dtc-control-iterable>
  </div>
</template>

<script setup>
import DtcControlString from './control_string';
import DtcControlIterable from './control_iterable';
import DtcControlDynamic from './control_dynamic';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: Object,
    default: undefined,
  },
  args: {
    type: Object,
    default: undefined,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

const entries = computed(() => {
  return Object.entries(props.value);
});

function generateEntry () {
  return [null, null];
}

function updateEntryKey (e, value, updateItem) {
  updateItem([e, value]);
}

function updateEntryValue (e, key, updateItem) {
  updateItem([key, e]);
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
