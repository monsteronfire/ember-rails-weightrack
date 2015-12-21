import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('about');
  this.resource('weights', function() {
    this.route('show', {path: ':weight_id'});
  });
});

export default Router;
