<template>
  <dt-tab-group
    class="d-d-flex d-fd-column d-of-y-auto d-h100p"
    :selected="getId(selected)"
    borderless
  >
    <template #tabs>
      <div>
        <template
          v-for="(_, slot) in slots"
          :key="slot"
        >
          <dt-tab
            :id="getId(slot)"
            :panel-id="getId(slot)"
          >
            {{ capitalCase(slot) }}
          </dt-tab>
        </template>
      </div>
    </template>
    <template
      v-for="(_, slot) in slots"
      :key="slot"
    >
      <dt-tab-panel
        :id="getId(slot)"
        :tab-id="getId(slot)"
        class="d-d-flex d-fl-grow1"
      >
        <slot :name="slot" />
      </dt-tab-panel>
    </template>
  </dt-tab-group>
</template>

<script setup>
import { DtTabGroup, DtTabPanel, DtTab } from '@dialpad/dialtone-vue';
import { useSlots } from 'vue';
import { getUniqueString } from '@/src/lib/utils';
import { capitalCase } from 'change-case';

const props = defineProps({
  id: {
    type: String,
    default: () => getUniqueString(),
  },
  selected: {
    type: String,
    default: undefined,
  },
});

const slots = useSlots();

function getId (slot) {
  return `${props.id}-${slot}`;
}
</script>

<script>
export default {
  name: 'DtcSelector',
};
</script>
