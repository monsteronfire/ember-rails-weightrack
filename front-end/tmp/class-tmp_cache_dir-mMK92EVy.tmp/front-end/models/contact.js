define('front-end/models/contact', ['exports', 'ember-data'], function (exports, DS) {

  'use strict';

  exports['default'] = DS['default'].Model.extend({
    firstName: DS['default'].attr('string'),
    lastName: DS['default'].attr('string'),
    email: DS['default'].attr('string'),
    title: DS['default'].attr('string'),
    createdAt: DS['default'].attr('date'),
    updatedAt: DS['default'].attr('date')
  });

});