import DtcControlBoolean from './control_boolean';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import { controlMap } from '@/src/lib/control';

const inputSelector = '[data-qa=dtc-control-boolean-input]';

const inputValue = true;
const defaultValue = controlMap.boolean.default;

describe('control_boolean.vue test', function () {
  let wrapper;
  beforeEach(function () {
    wrapper = mount(DtcControlBoolean);
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
      assert.equal(inputValue, wrapper.find(inputSelector).element.checked);
    });
  });

  describe('When a value is not provided', function () {
    it('Should set the native input to control default', function () {
      assert.equal(defaultValue, wrapper.find(inputSelector).element.checked);
    });
  });
});
