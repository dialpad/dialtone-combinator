import DtcControlObject from './control_object';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';

const itemKeySelector = '[data-qa=dtc-control-object-item-key]';
const itemKeyInputSelector = 'input';

const itemValueSelector = '[data-qa=dtc-control-object-item-value]';
const itemValueInputSelector = 'input';

const inputValues = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
  key4: 4,
};

describe('control_object.vue test', function () {
  let wrapper;
  beforeEach(function () {
    wrapper = mount(DtcControlObject);
  });

  describe('When mounted', function () {
    it('Should render successfully', function () {
      assert.exists(wrapper);
    });
  });

  describe('When a value is provided', function () {
    let itemKeyWrappers;
    let itemValueWrappers;
    beforeEach(async function () {
      await wrapper.setProps({
        value: inputValues,
      });
      itemKeyWrappers = wrapper.findAll(itemKeySelector);
      itemValueWrappers = wrapper.findAll(itemValueSelector);
    });

    it('Should generate a key control and a value control for each object entry', function () {
      assert.equal(Object.keys(inputValues).length, itemKeyWrappers.length);
      assert.equal(Object.values(inputValues).length, itemValueWrappers.length);
    });

    // Checking if each key-value pair passed to the component has native inputs with a matching values
    describe('Should have matching control and native input values', function () {
      Object.entries(inputValues).forEach(([inputKey, inputValue]) => {
        it(`Should have a matching native input for key '${inputKey}'`, function () {
          const itemKeys = itemKeyWrappers.map(itemWrapper => {
            return itemWrapper.find(itemKeyInputSelector).element.value;
          });

          assert.isTrue(itemKeys.includes(inputKey));
        });

        it(`Should have a matching native input for value '${inputValue}'`, function () {
          const itemValues = itemValueWrappers.map(itemWrapper => {
            return itemWrapper.find(itemValueInputSelector).element.value;
          });
          assert.isTrue(itemValues.includes(inputValue.toString()));
        });
      });
    });
  });
});
