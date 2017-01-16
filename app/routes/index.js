import Ember from 'ember';
const {
  Route,
  get
} = Ember;

export default Ember.Route.extend({
  model() {
    return get(this, 'store').findAll('timeline-item', { include: 'comments,likes' });
  }
});
