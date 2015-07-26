define('front-end/routes/contact', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  exports['default'] = Ember['default'].Route.extend({
    model: function model(params) {
      return this.store.find('contact', params.contact_id);
    }
  });

});