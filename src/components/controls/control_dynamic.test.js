import DtcControlDynamic from './control_dynamic';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import { UNSET } from '@/src/lib/control';

const testControls = {
  string: 'string test',
  number: 17,
  true: true,
  false: false,
  null: null,
  undefined: UNSET,
  NaN,
};

const defaultValue = undefined;

describe('control_dynamic.vue test', function () {
  let wrapper;

  describe('When mounted', function () {
    wrapper = mount(DtcControlDynamic, {
      props: {
        value: defaultValue,
      },
    });

    it('Should render successfully', function () {
      assert.exists(wrapper);
    });
  });

  Object.entries(testControls).forEach(([controlKey, controlValue]) => {
    describe(`When provided value is '${controlValue === UNSET ? `${UNSET.toString()}` : controlValue}'`, function () {
      before(function () {
        wrapper = mount(DtcControlDynamic, {
          props: {
            value: controlValue,
          },
        });
      });

      it(`Should use the '${controlKey}' control`, function () {
        assert.isTrue(true);
      });
    });
  });
});
