import Ember from 'ember';

const {
  Component,
  get,
  computed,
  inject: { service }
} = Ember;

export default Component.extend({
  store: service(),
  post: null,
  commentContent: null,

  sortCriteria: ['createdAt:asc'],
  sortedComments: computed.sort('post.comments', 'sortCriteria'),

  actions: {
    addCommentOnPost(post) {
      let newComment = get(this, 'store').createRecord('comment', {
        content: get(this, 'commentContent'),
        reactionableType: 'timeline-items',
        reactionableId: get(post, 'id'),
      });

      get(post, 'comments').pushObject(newComment);
      newComment.save().
        then(() => document.querySelector('.comment-textbox').value = null).
        catch(error => {
          console.error(error);
          return get(this, 'store').unloadRecord(newComment);
        });

      return false;
    },
  }
});
