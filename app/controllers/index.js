import Ember from 'ember';

const {
  Controller,
  get,
  computed: { sort }
} = Ember;

export default Controller.extend({
  sortCriteria: ['created-at:desc'],
  posts: sort('model', 'sortCriteria'),

  likeText: 'Like',
  likeAction: 'likeTimelineItem',
  timelineItemText: null,
  timelineItemKind: 'text-timeline-item',

  actions: {
    addTimelineItem() {
      const kind = get(this, 'timelineItemKind');
      const itemText = get(this, 'timelineItemText');

      let newTimelineItem = get(this, 'store').createRecord(kind, {
        kind,
        itemText,
      });

      newTimelineItem.save().
        then(item => {
          // Reset content in the compose box
          document.querySelector('.textbox').value = null
          return this.transitionToRoute('posts.post', item.id);
        }).
        catch(error => {
        // TODO: Put in the notification bar that their post
        // failed to be persisted. Perhaps due to bad internet connection.
        // get(this, 'store').unloadRecord(newTimelineItem);
        console.error(error);
      });
    },

    likeTimelineItem(post) {
      let like = get(this, 'store').createRecord('like', {
        reactionableType: 'timeline-items',
        reactionableId: post.id
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
      return this.setProperties({
        likeText: 'Like',
        likeAction: 'likeTimelineItem',
      });
    }
  }
});
