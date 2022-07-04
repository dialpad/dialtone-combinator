<template>
  <vue-live
    v-if="!loading"
    :code="code"
    :components="componentSet"
    :editor-props="{ lineNumbers: true, ignoreTabKey: true }"
    :layout="layout"
    check-variable-availability
  />
</template>

<script>
import { VueLive } from 'vue-live';
import 'vue-live/lib/vue-live.esm.css';
import * as dialtoneVue from '@dialpad/dialtone-vue';
import layout from './layout/layout_code_preview.vue';

export default {
  name: 'DcCodePreview',
  components: {
    VueLive,
  },
  props: {
    code: {
      type: String,
      required: true,
    },
    componentSet: {
      type: Object,
      default: null,
    },
  },
  data () {
    return {
      loading: false,
      layout,
      dialtoneVue,
    };
  },
};
</script>
