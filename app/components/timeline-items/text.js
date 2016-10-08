import Ember from 'ember';
const {
  Component,
  get,
  inject: { service }
} = Ember;

export default Component.extend({
  store: service(),
  likeAction: 'likeTimelineItem',
  likeText: 'Like',

  actions: {
    likeTimelineItem(postId) {
      const post = get(this, 'store').peekRecord('timeline-item', postId);
      const like = get(this, 'store').createRecord('like', {
        reactionableType: 'timeline-items',
        reactionableId: get(post, 'id')
      });

      get(post, 'likes').pushObject(like);
      like.save().
        then(() => {
          return this.setProperties({
            likeText: 'Unlike',
            likeAction: 'unlikeTimelineItem',
          });
        }).
        catch((error) => {
          console.error(error);
          return get(this, 'store').unloadRecord(like);
        });
    },

    unlikeTimelineItem(postId) {
      get(this, 'store').findRecord('timeline-item', postId).
        then(post => {
          get(post, 'likes').popObject();
          return this.setProperties({
            likeText: 'Like',
            likeAction: 'likeTimelineItem',
          });
        }).
        catch(error => console.log(error) || false);
    },
  }
});
