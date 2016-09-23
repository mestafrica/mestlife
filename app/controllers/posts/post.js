import Ember from 'ember';

export default Ember.Controller.extend({
  commentContent: null,

  actions: {
    clearCachedCommentContentValue() {
      return this.set('commentContent', null);
    },

    createCommentOnTimelineItem() {
      let newComment = this.get('store').createRecord('comment', {
        content: this.get('commentContent'),
        reactionableType: 'timeline-items',
        reactionableId: this.get('model').get('id')
      });

      this.get('model').get('comments').pushObject(newComment);
      newComment.save().
        then(() => this.send('clearCachedCommentContentValue')).
        catch(error => {
          console.error('ERROR', error)
          return this.get('store').unloadRecord(newComment);
        });

      return false;
    },

    clearCommentContentIfReturnKeyIsPressed(event) {
      return event.keyCode === 13 && (event.target.value = null, this.send('clearCachedCommentContentValue'));
    },
  }
});
