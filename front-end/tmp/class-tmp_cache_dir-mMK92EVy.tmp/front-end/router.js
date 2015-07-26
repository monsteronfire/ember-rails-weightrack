define('front-end/router', ['exports', 'ember', 'front-end/config/environment'], function (exports, Ember, config) {

  'use strict';

  var Router = Ember['default'].Router.extend({
    location: config['default'].locationType
  });

  exports['default'] = Router.map(function () {
    this.resource('contacts', function () {
      this.resource('contact', { path: '/:contact_id' });
    });
    this.route('contacts', function () {});
    this.route('contact');
  });

});