import DtcOptionBarControl from './option_bar_control';

import { assert } from 'chai';
import { mount } from '@vue/test-utils';
import { controlMap } from '@/src/lib/control';

const labelSelector = '[data-qa=dtc-option-bar-control-label]';
const descriptionSelector = '[data-qa=dtc-option-bar-control-description]';

const testControls = Object.keys(controlMap);

describe('option_bar_control.vue test', function () {
  let wrapper;

  testControls.forEach((control) => {
    const testLabel = `${control} label`;
    const testDescription = `${control} description`;

    describe(`When mounted with control '${control}'`, function () {
      before(function () {
        wrapper = mount(DtcOptionBarControl, {
          props: {
            control,
            value: controlMap[control].default,
            validControls: [control],
            label: testLabel,
            description: testDescription,
          },
        });
      });

      it('Should render successfully', function () {
        assert.exists(wrapper);
      });

      it('Should display label text', function () {
        assert.equal(wrapper.find(labelSelector).element.textContent.toLowerCase(), testLabel);
      });

      it('Should display description text', function () {
        assert.equal(wrapper.find(descriptionSelector).element.textContent.toLowerCase(), testDescription);
      });
    });
  });
});
