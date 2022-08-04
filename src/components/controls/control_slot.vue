<template>
  <dt-input
    :value="value"
    class="d-r-none"
    type="textarea"
    spellcheck="false"
    @input="updateValue"
  >
    <template #labelSlot>
      <slot />
    </template>
  </dt-input>
</template>

<script setup>
import { DtInput } from '@dialpad/dialtone-vue';
import { VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { controlMap } from '@/src/lib/control';

defineProps({
  value: {
    type: undefined,
    default: () => controlMap.slot.default,
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT]);

function updateValue (e) {
  const value = e || controlMap.slot.default;
  emit(VALUE_UPDATE_EVENT, value);
}
</script>

<script>
export default {
  name: 'DtcControlSlot',
};
</script>
