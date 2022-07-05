<template>
  <div>
    <div class="d-p16">
      <h2>Props</h2>
      <dt-checkbox
        @input="onChangeActive"
      >
        active
      </dt-checkbox>
    </div>
    <div class="d-p16">
      <h2>Slots</h2>
      <dt-input
        label="default"
        class="d-r-none"
        type="textarea"
        :value="componentSlot.slots.default"
        @input="onChangeSlot"
      />
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

const props = defineProps({
  component: {
    type: Object,
    default: null,
  },
});

const componentActive = reactive({
  props: {
    active: false,
  },
});

const componentSlot = reactive({
  slots: {
    default: props.component.name,
  },
});

const emit = defineEmits(['update']);

function onChangeActive (e) {
  componentActive.props.active = e;
  emit('update', componentActive);
}

function onChangeSlot (e) {
  componentSlot.slots.default = e;
  emit('update', componentSlot);
}
</script>
