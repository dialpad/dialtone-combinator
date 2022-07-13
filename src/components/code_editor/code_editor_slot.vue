<template>
  <span
    v-if="slots"
    class="dtc-code-editor-editable"
    spellcheck="false"
    contenteditable
    @input="onInput"
  >
    {{ slots[name] }}
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

const emit = defineEmits(['update:options']);

function onInput (e) {
  emit('update:options', options => {
    options.slots[props.name] = e.target.textContent;
  });
}
</script>

<script>
export default {
  name: 'DtcCodeEditorElement',
};
</script>
