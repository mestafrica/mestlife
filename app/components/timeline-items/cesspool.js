import Ember from 'ember';
import config from 'mestlife/config/environment';

const {
  Component,
  computed,
  get,
} = Ember;

export default Component.extend({
  post: null,
  comments: computed('post', function() {
    return get(get(this, 'post'), 'comments');
  }),
  sortCriteria: ['createdAt:asc'],
  sortedComments: computed.sort('comments', 'sortCriteria'),

  threshold: config.COMMENT_THRESHOLD,

  firstComment: computed('sortedComments.firstObject', function() {
    const sortedComments = get(this, 'sortedComments');
    if (get(sortedComments, 'length') >= config.COMMENT_THRESHOLD) {
      return get(sortedComments, 'firstObject');
    }
  }),

  lastButOneComment: computed('sortedComments.lastObject', function() {
    const sortedComments = get(this, 'sortedComments');
    const length = get(sortedComments, 'length');
    if (length >= config.COMMENT_THRESHOLD) {
      return sortedComments.objectAt(length-2);
    }
  }),

  lastComment: computed('sortedComments.lastObject', function() {
    const sortedComments = get(this, 'sortedComments');
    if (get(sortedComments, 'length') >= config.COMMENT_THRESHOLD) {
      return get(sortedComments, 'lastObject');
    }
  }),
});
