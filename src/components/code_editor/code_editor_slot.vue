<template>
  <span
    contenteditable
    @input="onInput"
  >
    {{ slots?.[name] }}
  </span>
</template>

<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
  name: {
    type: String,
  },
  slots: {
    type: Object,
  },
});

const emit = defineEmits(['update-options']);

function onInput (e) {
  emit('update-options', options => {
    options.slots[props.name] = e.target.textContent;
  });
}
</script>

<script>
export default {
  name: 'DtcCodeEditorElement',
};
</script>
