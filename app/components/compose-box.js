import Ember from 'ember';
const {
  set,
  get,
  inject: {
    service
  }
} = Ember;

export default Ember.Component.extend({
  tagName: 'article',
  classNames: ['compose'],
  kind: 'text-timeline-item'
});
