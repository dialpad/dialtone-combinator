<template>
  <span
    class="dtc-code-editor__editable"
    contenteditable
    @input="onInput"
  >
    {{ slots?.[name] }}
  </span>
</template>

<script setup>
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
