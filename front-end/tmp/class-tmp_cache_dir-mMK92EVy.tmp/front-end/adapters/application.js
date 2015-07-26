define('front-end/adapters/application', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].ActiveModelAdapter.extend({
    namespace: 'api/v1',
    host: 'http://localhost:3000'
  });

});