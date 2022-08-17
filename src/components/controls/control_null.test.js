import DtcControlNull from './control_null';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';

const inputSelector = 'select';

const inputValue = NaN;

const inputString = 'NaN';
const defaultString = 'null';

describe('control_null.vue test', function () {
  let wrapper;
  let inputWrapper;
  beforeEach(function () {
    wrapper = mount(DtcControlNull);
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
      assert.equal(inputString, inputWrapper.element.value);
    });
  });

  describe('When a value is not provided', function () {
    it('Should set the native input to control default', function () {
      assert.equal(defaultString, inputWrapper.element.value);
    });
  });
});
