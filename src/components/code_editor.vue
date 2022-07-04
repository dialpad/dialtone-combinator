<template>
  <div class="dc-code-editor d-bgc-black-500">
    <slot />
  </div>
</template>

<style>
.dc-code-editor {
  padding: var(--su16);
  color: white;
  background-color: hsla(var(--black-600-h) var(--black-600-s) var(--black-600-l) ' / ' var(--bgo));
  overflow: hidden;
}

.dc-code-editor textarea:focus {
  outline: none;
}
</style>
