import Ember from 'ember';

const {
  Controller,
  get,
  computed: { sort }
} = Ember;

export default Controller.extend({
  sortCriteria: ['created-at:desc'],
  posts: sort('model', 'sortCriteria'),
});
