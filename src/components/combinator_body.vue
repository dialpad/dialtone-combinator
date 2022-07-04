<template>
  <div class="dc-root__body_top d-grs1 d-of-y-auto d-bgc-transparent d-ba d-bc-black">
    <dc-renderer>
      <slot name="preview" />
    </dc-renderer>
  </div>
  <div class="dc-root__body_bottom d-grs2 d-of-y-auto d-bgc-black-600">
    <dc-code-preview>
      <slot name="editor" />
    </dc-code-preview>
  </div>
</template>

<script setup>
/* eslint vue/no-multiple-template-root: 0 */

import DcRenderer from './renderer.vue';
import DcCodePreview from './code_preview.vue';

</script>

<style lang="less">
.dc-root__body {
  margin-top: var(--su16);
  display: block;
  border-radius: var(--su8);
}

.dc-root__body_top {
  border-radius: 6px 6px 0 0;
  padding: 30px;
  background-color: var(--black-025);
  text-align: center;
}

.dc-root__body_bottom {
  background-color: hsla(var(--black-600-h) var(--black-600-s) var(--black-600-l) ~' / ' var(--bgo));
  color: white;
  padding: var(--su16);
  overflow: hidden;
  border-radius: 0 0 6px 6px;
}

.dc-root__body_bottom textarea:focus {
  outline: none;
}
</style>
