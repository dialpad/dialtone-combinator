import { assert } from 'chai';
import { enableAutoUnmount } from '@vue/test-utils';

enableAutoUnmount(after);

describe('base.test.js', function () {
  describe('When running test', function () {
    it('Should correctly resolve asserts', function () {
      assert.isTrue(true);
    });
  });
});

// const _mountWrapper = () => {
//   wrapper = mount();
//   _setChildWrappers();
// };
//
// const _setChildWrappers = () => {
// };
//
// before(function () {
//   _mountWrapper();
// });
