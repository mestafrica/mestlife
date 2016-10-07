import Ember from 'ember';

export default Ember.Controller.extend({
  commentContent: null,

  actions: {
    createCommentOnTimelineItem() {
      let newComment = this.get('store').createRecord('comment', {
        content: this.get('commentContent'),
        reactionableType: 'timeline-items',
        reactionableId: this.get('model').get('id')
      });

      this.get('model').get('comments').pushObject(newComment);
      newComment.save().
        then(() => document.querySelector('.comment-textbox').value = null).
        catch(error => {
          console.error('ERROR', error)
          return this.get('store').unloadRecord(newComment);
        });

      return false;
    },
  }
});
