<template>
  <div>
    <div class="d-pb2">
      <dtc-option-bar-control-selector
        v-if="types"
        :selected="control"
        :controls="validControls"
        :types="types"
        :disabled="locked"
        @update:control="updateControl"
      />
    </div>
    <component
      :is="controlComponent"
      v-bind="bindings"
      @update:value="updateValue"
    >
      <span>
        <span
          class="d-pr4"
          data-qa="dtc-option-bar-control-label"
        >
          {{ label }}
        </span>
        <icon-lock
          v-if="locked"
          class="d-pr4 d-fs10 d-ps-relative d-t1"
        />
        <span
          v-if="showModelTag"
          class="d-pl2 d-ps-relative d-b2"
        >
          <dt-badge
            text="v-model"
            color="black-700"
          />
        </span>
      </span>
    </component>
    <div
      class="d-description d-p1"
      data-qa="dtc-option-bar-control-description"
    >
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import IconLock from 'dialtone-icons/IconLock';
import { DtBadge } from '@dialpad/dialtone-vue';
import { CONTROL_UPDATE_EVENT, VALUE_UPDATE_EVENT } from '@/src/lib/constants';
import { computed } from 'vue';
import {
  controlMap,
  deserializeControlValue,
  getControlComponent,
  serializeControlValue,
} from '@/src/lib/control';
import DtcOptionBarControlSelector from '@/src/components/option_bar/option_bar_control_selector';

const props = defineProps({
  /**
   * Control representing an entry in the 'control map'.
   */
  control: {
    type: String,
    required: true,
  },
  /**
   * Array of valid controls in the 'control map'.
   */
  validControls: {
    type: Array,
    required: true,
  },
  value: {
    type: undefined,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: undefined,
  },
  /**
   * Array of valid types for member.
   */
  types: {
    type: Array,
    default: undefined,
  },
  /**
   * Map of member tags.
   */
  tags: {
    type: Object,
    default: undefined,
  },
  /**
   * Prevent the control from being modified.
   */
  locked: {
    type: Boolean,
    default: false,
  },
  /**
   * Optional args to bind directly to the control.
   */
  args: {
    type: Object,
    default: () => {},
  },
});

const emit = defineEmits([VALUE_UPDATE_EVENT, CONTROL_UPDATE_EVENT]);

/**
 * Value to pass to the underlying control.
 * The value is serialized if needed.
 *
 * @type {ComputedRef<*>}
 */
const controlValue = computed(() => {
  return controlMap[props.control].serialize
    ? serializeControlValue(props.value)
    : props.value;
});

/**
 * Actual component based on the value of the 'control' prop.
 *
 * @type {ComputedRef<object>}
 */
const controlComponent = computed(() => {
  return getControlComponent(props.control, controlArgs.value);
});

/**
 * Args that are conditionally passed to the
 * underlying control props if the prop is present on the control.
 *
 * @type {ComputedRef<object>}
 */
const controlArgs = computed(() => {
  return {
    value: controlValue.value,
    disabled: props.locked,
    tags: props.tags,
    ...props.args,
  };
});

/**
 * Object containing only the args that are
 * present on the control component props.
 *
 * @type {ComputedRef<object>}
 */
const bindings = computed(() => {
  const component = controlComponent.value;
  if (!component.props) { return null; }
  return Object.fromEntries(
    Object.entries(controlArgs.value).filter(([arg, _]) => {
      const controlProps = Object.keys(component.props);
      return controlProps.includes(arg);
    }),
  );
});

const showModelTag = computed(() => {
  const tags = props.tags;
  return tags
    ? 'model' in tags
    : false;
});

/**
 * Emits an update to the member value.
 * The value is deserialized if needed.
 *
 * @param e - The updated member value
 */
function updateValue (e) {
  if (props.locked) { return; }
  const value = controlMap[props.control].serialize
    ? deserializeControlValue(e)
    : e;
  emit(VALUE_UPDATE_EVENT, value);
}

/**
 * Emits event to update member control.
 *
 * @param e - The updated member control
 */
function updateControl (e) {
  if (props.locked) { return; }
  emit(CONTROL_UPDATE_EVENT, e);
}
</script>

<script>
/**
 * The 'option bar control' component wraps an underlying 'control' component to provide extended functionality
 * and decouple the reliance on the option bar and members from individual 'control' components.
 */
export default {
  name: 'DtcOptionBarControl',
};
</script>

<style>
.dtc-option-bar-control__button:not([control-active]) {
  background-color: transparent !important;
  border: currentColor 1px solid !important;
}

.dtc-option-bar-control__icon[disabled] {
  background-color: transparent !important;
}
</style>
