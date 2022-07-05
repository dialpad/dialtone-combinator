<template>
  <div>
    <div class="d-p16">
      <h2>Props</h2>
      <dt-checkbox @input="onInput">
        active
      </dt-checkbox>
    </div>
    <div class="d-p16">
      <h2>Slots</h2>
      <dt-input
        class="d-r-none"
        type="textarea"
      >
        default
      </dt-input>
    </div>
    <div class="d-p16">
      <h2>Events</h2>
      <dt-button>
        click
      </dt-button>
    </div>
  </div>
</template>

<script setup>
import { DtCheckbox, DtButton, DtInput } from '@dialpad/dialtone-vue';
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
