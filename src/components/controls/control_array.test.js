import DtcControlArray from './control_array';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';

const itemSelector = '[data-qa=dtc-control-array-item]';
const itemInputSelector = 'input';

const inputValues = [
  'item1',
  'item2',
  'item3',
  4,
];

describe('control_array.vue test', function () {
  let wrapper;
  beforeEach(function () {
    wrapper = mount(DtcControlArray);
  });

  describe('When mounted', function () {
    it('Should render successfully', function () {
      assert.exists(wrapper);
    });
  });

  describe('When a value is provided', function () {
    let itemWrappers;
    beforeEach(async function () {
      await wrapper.setProps({
        value: inputValues,
      });
      itemWrappers = wrapper.findAll(itemSelector);
    });

    it('Should generate a control for each array item', function () {
      assert.equal(inputValues.length, itemWrappers.length);
    });

    // Checking if each value passed to the component has a native input with a matching value
    describe('Should have matching control and native input values', function () {
      inputValues.forEach(value => {
        it(`Should have a matching native input for value '${value}'`, function () {
          const itemValues = itemWrappers.map(itemWrapper => itemWrapper.find(itemInputSelector).element.value);
          assert.isTrue(itemValues.includes(value.toString()));
        });
      });
    });
  });
});
