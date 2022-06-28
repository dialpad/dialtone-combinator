<template>
  <div class="dc-root d-d-grid d-gg16 d-gl-sidebar d-h100p">
    <div class="dc-root__body d-d-grid d-gg16 d-ga-content d-h100p">
      <div class="dc-root__top d-bgc-green-200">
        <dc-renderer />
      </div>
      <div class="dc-root__bottom d-bgc-orange-200">
        <dc-code-preview />
      </div>
    </div>
    <div class="d-ga-sidebar d-bgc-purple-200">
      <dc-option-bar />
    </div>
  </div>
</template>

<script>
import DcRenderer from '@/components/renderer.vue';
import DcOptionBar from '@/components/option_bar.vue';
import DcCodePreview from '@/components/code_preview.vue';

export default {
  name: 'DcCombinator',
  components: {
    DcRenderer,
    DcOptionBar,
    DcCodePreview,
  },
};
</script>

<style lang="less">
.dc-root {
  direction: rtl;
}

.dc-root > * {
  direction: initial;
}
</style>
