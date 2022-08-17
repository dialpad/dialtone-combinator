import DtcControlString from './control_string';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import { controlMap } from '@/src/lib/control';

const inputSelector = 'input';

const inputValue = 'string test';
const defaultValue = controlMap.string.default;

describe('control_string.vue test', function () {
  let wrapper;
  let inputWrapper;
  beforeEach(function () {
    wrapper = mount(DtcControlString);
    inputWrapper = wrapper.find(inputSelector);
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
      assert.equal(inputValue, inputWrapper.element.value);
    });
  });

  describe('When a value is not provided', function () {
    it('Should set the native input to control default', function () {
      assert.equal(defaultValue, inputWrapper.element.value);
    });
  });
});
