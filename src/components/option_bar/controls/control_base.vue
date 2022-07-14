<template>
  <dtc-control-string
    :name="name"
    :default-value="defaultValue"
  />
</template>

<script setup>
import DtcControlString from './control_string.vue';

defineProps({
  name: {
    type: String,
  },
  defaultValue: {
    type: String,
  },
});

defineEmits(['update:options']);
</script>

<script>
export default {
  name: 'DtcControlBase',
};
</script>
