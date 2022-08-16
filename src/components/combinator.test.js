import DtcCombinator from './combinator';

import { assert } from 'chai';
import { shallowMount } from '@vue/test-utils';
import { getSupportedComponents } from '@/src/lib/utils_test';

describe('combinator.vue tests', function () {
  const testComponents = getSupportedComponents();

  describe(`Supported component tests`, function () {
    testComponents.forEach(component => {
      const wrapper = shallowMount(DtcCombinator, {
        props: {
          component,
        },
      });

      describe(`When mounted with: ${component.name}`, function () {
        it('Should render successfully', function () {
          assert.exists(wrapper);
        });
      });
    });
  });
});
