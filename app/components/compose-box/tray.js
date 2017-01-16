import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'footer',

  actions: {
    makePost() {
      return this.attrs.makePost();
    }
  }
});
