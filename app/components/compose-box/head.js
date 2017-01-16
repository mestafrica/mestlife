import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'header',
  classNames: ['feed-container'],

  actions: {
    close() {
      return this.attrs.close();
    }
  }
});
