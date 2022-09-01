<script>
import { h } from 'vue';
import { DtAvatar } from '@dialpad/dialtone-vue';

export default {
  name: 'DtcNode',
  props: {
    template: {
      required: true,
      type: String,
    },
  },
  render (props) {
    return h({
      components: {
        DtAvatar,
      },
      template: props.template,
    });
  },
};
</script>
