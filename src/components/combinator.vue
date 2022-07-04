<template>
  <div class="dc-root d-d-grid d-gg8 d-h100p">
    <div class="dc-root__top d-grs1 d-of-y-auto d-bgc-green-200">
      <dc-renderer>
        <component
          :is="component"
          v-if="component"
        >
          <slot />
        </component>
      </dc-renderer>
    </div>
    <div class="dc-root__bottom d-grs2 d-of-y-auto d-bgc-orange-200">
      <dc-code-preview
        :component-set="componentSet"
        :code="'<dt-button>Hi</dt-button>'"
      />
    </div>
    <div class="dc-root__sidebar d-grs1 d-gr2 d-of-y-auto d-bgc-purple-200">
      <dc-option-bar />
    </div>
  </div>
</template>

<script>
import DcRenderer from './renderer.vue';
import DcOptionBar from './option_bar.vue';
import DcCodePreview from './code_preview.vue';

export default {
  name: 'DcCombinator',
  components: {
    DcRenderer,
    DcOptionBar,
    DcCodePreview,
  },
  props: {
    component: {
      type: Object,
      default: null,
    },

    /**
     * Additional components to be rendered.
     */
    componentSet: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style>
.dc-root {
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
}
</style>
