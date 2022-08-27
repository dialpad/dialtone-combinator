<template>
  <div class="d-w100p d-h100p">
    <slot name="content" />
    <div class="d-pe-none">
      <div class="d-pe-auto d-h100p">
        <slot name="overlay" />
      </div>
    </div>
  </div>
</template>

<script>
const positionMap = Object.freeze({
  topRight: 'd-jc-flex-end',
  bottomRight: 2,
});

export const positions = Object.keys(positionMap);

export default {
  name: 'DtcOverlay',
};
</script>
