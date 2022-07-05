<template>
  <div class="dtc-code-editor">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DtcCodeEditor',
};
</script>

<style>
.dtc-code-editor {
  padding: var(--su16);
  color: white;
  background-color: hsla(var(--black-600-h) var(--black-600-s) var(--black-600-l) ' / ' var(--bgo));
  overflow: hidden;
}

.dtc-code-editor textarea:focus {
  outline: none;
}
</style>
