define('front-end/tests/unit/helpers/formatted-date-test', ['front-end/helpers/formatted-date', 'qunit'], function (formatted_date, qunit) {

  'use strict';

  qunit.module('Unit | Helper | formatted date');

  // Replace this with your real tests.
  qunit.test('it works', function (assert) {
    var result = formatted_date.formattedDate(42);
    assert.ok(result);
  });

});