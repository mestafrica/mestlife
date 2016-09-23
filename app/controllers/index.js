import Ember from 'ember';

export default Ember.Controller.extend({
  likeText: 'Like',
  likeAction: 'likeTimelineItem',

  actions: {
    likeTimelineItem(post) {
      let like = this.get('store').createRecord('like', {
        reactionableType: 'timeline-items',
        reactionableId: post.id
      });

      post.get('likes').pushObject(like);
      like.save().
        then(() => {
          return this.setProperties({
            likeText: 'Unlike',
            likeAction: 'unlikeTimelineItem',
          });
        }).
        catch((error) => {
          console.error(error);
          return this.get('store').unloadRecord(like);
        });
    },

    unlikeTimelineItem(postId) {
      return this.setProperties({
        likeText: 'Like',
        likeAction: 'likeTimelineItem',
      });
    }
  }
});
