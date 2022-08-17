import DtcControlBase from './control_base';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';

describe('control_base.vue test', function () {
  let wrapper;
  beforeEach(function () {
    wrapper = mount(DtcControlBase);
  });

  describe('When mounted', function () {
    it('Should render successfully', function () {
      assert.exists(wrapper);
    });
  });
});
