<template>
  <div class="d-d-flex d-ai-flex-end">
    <div class="d-fl-grow1">
      <dt-input
        :value="inputValue"
        :disabled="disabled || isNaN(value)"
        type="number"
        size="sm"
        @input="e => emit(VALUE_UPDATE_EVENT, parseInt(e))"
      >
        <template #labelSlot>
          <slot />
        </template>
      </dt-input>
    </div>
    <div class="d-pl6 d-ta-center">
      <span>NaN</span>
      <dt-toggle
        :checked="isNaN(value)"
        @change="toggleNaN"
      />
    </div>
  </div>
</template>

<script setup>
import { DtInput, DtToggle } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: Number,
    default: () => Number(),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

function isNaN (value) {
  return Number.isNaN(value);
}

const inputValue = computed(() => {
  return isNaN(props.value) ? null : props.value;
});

function toggleNaN (e) {
  emit(VALUE_UPDATE_EVENT, e ? NaN : 0);
}

const emit = defineEmits([VALUE_UPDATE_EVENT]);
</script>

<script>
/**
 * Control that is used to set 'number' value.
 */
export default {
  name: 'DtcControlNumber',
};
</script>
