import DtcControlString from './control_string';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import { controlMap } from '@/src/lib/control';

const inputSelector = '[data-qa=dtc-control-string-input]';

const inputValue = 'string test';
const defaultValue = controlMap.string.default;

describe('control_string.vue test', function () {
  let wrapper;
  beforeEach(function () {
    wrapper = mount(DtcControlString);
  });

  describe('When mounted', function () {
    it('Should render successfully', function () {
      assert.exists(wrapper);
    });
  });

  describe('When a value is provided', function () {
    beforeEach(async function () {
      await wrapper.setProps({
        value: inputValue,
      });
    });

    it('Should set the native input to value', function () {
      assert.equal(inputValue, wrapper.find(inputSelector).element.value);
    });
  });

  describe('When a value is not provided', function () {
    it('Should set the native input to control default', function () {
      assert.equal(defaultValue, wrapper.find(inputSelector).element.value);
    });
  });
});
