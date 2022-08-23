import DtcControlNumber from './control_number';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import { controlMap } from '@/src/lib/control';

const inputSelector = 'input';

const inputValue = 5;
const defaultValue = controlMap.number.default;

describe('control_number.vue test', function () {
  let wrapper;
  let inputWrapper;

  const _mountWrapper = () => {
    wrapper = mount(DtcControlNumber);
    _setChildWrappers();
  };

  const _setChildWrappers = () => {
    inputWrapper = wrapper.find(inputSelector);
  };

  before(function () {
    _mountWrapper();
  });

  describe('When mounted', function () {
    it('Should render successfully', function () {
      assert.isTrue(wrapper.exists());
    });
  });

  describe('When a value is provided', function () {
    beforeEach(async function () {
      await wrapper.setProps({
        value: inputValue,
      });
      _setChildWrappers();
    });

    it('Should set the native input to value', function () {
      assert.equal(inputValue, inputWrapper.element.value);
    });
  });

  describe('When a value is not provided', function () {
    beforeEach(function () {
      _mountWrapper();
    });

    it('Should set the native input to control default', function () {
      assert.equal(defaultValue, inputWrapper.element.value);
    });
  });
});
