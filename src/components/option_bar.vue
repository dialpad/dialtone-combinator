<template>
  <div>
    <div class="d-p16">
      <h2>Props</h2>
      <dt-checkbox
        :checked="componentActive.props.active"
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
      <ul>
        <li>click</li>
        <li>focusin</li>
        <li>focusout</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { paramCase } from 'change-case';
import { DtCheckbox, DtInput } from '@dialpad/dialtone-vue';
import { defineProps, defineEmits, reactive } from 'vue';

const props = defineProps({
  component: {
    type: Object,
    default: null,
  },
});

const componentActive = reactive({
  props: {
    active: true,
  },
});

const componentSlot = reactive({
  slots: {
    default: paramCase(props.component.name),
  },
});

const emit = defineEmits(['update']);

onChangeActive(componentActive.props.active);
onChangeSlot(componentSlot.slots.default);

function onChangeActive (e) {
  componentActive.props.active = e;
  emit('update', componentActive);
}

function onChangeSlot (e) {
  componentSlot.slots.default = e;
  emit('update', componentSlot);
}
</script>
