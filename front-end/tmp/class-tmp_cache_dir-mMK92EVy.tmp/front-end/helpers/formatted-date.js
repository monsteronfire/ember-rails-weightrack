define('front-end/helpers/formatted-date', ['exports', 'ember'], function (exports, Ember) {

  'use strict';

  /* global moment:true */

  exports['default'] = Ember['default'].Handlebars.makeBoundHelper(function (date, format) {
    return moment(date).format(format);
  });

});