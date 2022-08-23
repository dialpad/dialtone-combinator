import DtcControlDynamic from './control_dynamic';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import { controlMap, UNSET } from '@/src/lib/control';

const selectionSelector = '[data-qa=dtc-control-dynamic-selection]';
const inputSelector = 'select';

const testControls = {
  string: {
    value: 'string test',
    component: controlMap.string.component(),
  },
  number: {
    value: 17,
    component: controlMap.number.component(),
  },
  true: {
    value: true,
  },
  false: {
    value: false,
  },
  null: {
    value: null,
  },
  undefined: {
    value: undefined,
  },
  NaN: {
    value: NaN,
  },
};

const defaultValue = undefined;

describe('control_dynamic.vue test', function () {
  let wrapper;

  describe('When mounted', function () {
    before(function () {
      wrapper = mount(DtcControlDynamic, {
        props: {
          value: defaultValue,
        },
      });
    });

    it('Should render successfully', function () {
      assert.exists(wrapper);
    });
  });

  Object.entries(testControls).forEach(([control, { value, component }]) => {
    describe(
      `When provided value is '${value === UNSET ? `${UNSET.toString()}` : value}' {${typeof value}}`,
      function () {
        before(function () {
          wrapper = mount(DtcControlDynamic, {
            props: {
              value,
            },
          });
        });

        it(`Should set selection to '${control}'`, function () {
          assert.equal(wrapper.find(selectionSelector).find(inputSelector).element.value, control);
        });

        if (component) {
          it(`Should set the generated control to '${component.name}'`, function () {
            assert.exists(wrapper.findComponent(component));
          });
        }
      },
    );
  });
});
