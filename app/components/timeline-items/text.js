import Ember from 'ember';
const {
  Component,
  get,
  set,
  computed,
  inject: { service }
} = Ember;

export default Component.extend({
  store: service(),
  likeAction: 'likeTimelineItem',
  likeText: 'Like',
  isEditingPostItemText: false,
  newText: null,

  hideWhenEditingPostItemText: computed('isEditingPostItemText', function() {
    return get(this, 'isEditingPostItemText') ? 'hide' : 'show';
  }),
  showWhenEditingPostItemText: computed('isEditingPostItemText', function() {
    return get(this, 'isEditingPostItemText') ? 'show' : 'hide';
  }),

  actions: {
    editPostItemText() {
      return set(this, 'isEditingPostItemText', true);
    },

    cancelEditPostItemEdit() {
      set(this, 'newPostItemText', null);
      set(this, 'isEditingPostItemText', false);
    },

    updatePostItemText(kind, id) {
      get(this, 'store').findRecord(`${kind}-timeline-item`, id).
        then(post => {
          const text = get(this, 'newText');
          if (text === null || !text.trim()) return false;
          set(post, 'itemText', text);
          post.save();
        }).
        then(post => set(this, 'isEditingPostItemText', false)).
        catch(e => console.error(e));

      return false;
    },

    deletePost(id) {
      if (confirm('Do you want to delete the post?')) {
        const store = get(this, 'store');
        store.findRecord('timeline-item', id, { backgroundReload: false }).
          then(post => post.destroyRecord()).
          catch(e => console.error(e));
      }
    },

    likeTimelineItem(postId) {
      const post = get(this, 'store').peekRecord('timeline-item', postId);
      const like = get(this, 'store').createRecord('like', {
        reactionableType: 'timeline-items',
        reactionableId: get(post, 'id')
      });

      get(post, 'likes').pushObject(like);
      like.save().
        then(() => {
          set(this, 'likeText', 'Unlike');
          set(this, 'likeAction', 'unlikeTimelineItem');
        }).
        catch(e => console.error(e), get(this, 'store').unloadRecord(like));
    },

    unlikeTimelineItem(postId) {
      get(this, 'store').findRecord('timeline-item', postId).
        then(post => {
          get(post, 'likes').popObject();
          set(this, 'likeText', 'Like');
          set(this, 'likeAction', 'likeTimelineItem');
        }).
        catch(error => console.log(error) || false);
    },
  }
});
