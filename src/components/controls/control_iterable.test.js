import DtcControlIterable from './control_iterable';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';

describe('control_iterable.vue test', function () {
  let wrapper;
  beforeEach(function () {
    wrapper = mount(DtcControlIterable, {
      props: {
        value: [],
        generateItem: () => null,
      },
    });
  });

  describe('When mounted', function () {
    it('Should render successfully', function () {
      assert.exists(wrapper);
    });
  });
});
