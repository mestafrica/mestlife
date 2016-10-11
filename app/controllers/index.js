import Ember from 'ember';

const {
  Controller,
  get,
  computed: { sort }
} = Ember;

export default Controller.extend({
  sortCriteria: ['created-at:desc'],
  posts: sort('model', 'sortCriteria'),

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
          this.transitionToRoute('posts.post', get(item, 'id'));
        }).
        catch(error => {
        // TODO: Put in the notification bar that their post
        // failed to be persisted. Perhaps due to bad internet connection.
        // get(this, 'store').unloadRecord(newTimelineItem);
        console.error(error);
      });

      return false;
    },
  }
});
