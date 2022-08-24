import DtcOptionBarMemberGroup from './option_bar_member_group';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import { getSupportedComponents } from '@/src/lib/test/utils_test';

const controlWrapperSelector = '[data-qa=dtc-option-bar-member-group-control]';

const stringMemberKey = 'stringMember';
const numberMemberKey = 'numberMember';
const booleanMemberKey = 'booleanMember';

function createTestMember (key) {
  return {
    name: key,
    getLabel () { return name; },
  };
}

const testMembers = [
  createTestMember(stringMemberKey),
  createTestMember(numberMemberKey),
  createTestMember(booleanMemberKey),
];

const testValues = {
  [stringMemberKey]: 'string test',
  [numberMemberKey]: 123,
  [booleanMemberKey]: true,
};

describe('option_bar_member_group.vue test', function () {
  let wrapper;
  let controlWrappers;

  const _mountWrapper = (component) => {
    wrapper = mount(DtcOptionBarMemberGroup, {
      props: {
        component,
        members: testMembers,
        values: testValues,
      },
    });
    _setChildWrappers();
  };

  const _setChildWrappers = () => {
    controlWrappers = wrapper.findAll(controlWrapperSelector);
  };

  const testComponents = getSupportedComponents();
  testComponents.forEach((component) => {
    describe(`When mounted with component '${component.name}'`, function () {
      beforeEach(function () {
        _mountWrapper(component);
      });

      afterEach(function () {
        wrapper.unmount();
      });

      it('Should render successfully', function () {
        assert.isTrue(wrapper.exists());
      });

      it('Should render a control for each member', function () {
        assert.equal(Object.keys(testMembers).length, controlWrappers.length);
      });
    });
  });
});
