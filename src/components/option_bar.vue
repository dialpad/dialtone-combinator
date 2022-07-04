<template>
  <div>
    <dt-checkbox @input="onInput">
      active
    </dt-checkbox>
  </div>
</template>

<script setup>
import { DtCheckbox } from '@dialpad/dialtone-vue';
import { defineProps, defineEmits, reactive } from 'vue';

defineProps({
  component: {
    type: Object,
    default: null,
  },
});

const componentProps = reactive({
  active: false,
});

const emit = defineEmits(['changeProps']);

function onInput (e) {
  componentProps.active = e;
  emit('changeProps', componentProps);
}
</script>
