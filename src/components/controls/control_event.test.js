import DtcControlEvent from './control_event';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';

describe('control_event.vue test', function () {
  let wrapper;
  beforeEach(function () {
    wrapper = mount(DtcControlEvent);
  });

  describe('When mounted', function () {
    it('Should render successfully', function () {
      assert.exists(wrapper);
    });
  });
});
