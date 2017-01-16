import Ember from 'ember';
const { Controller, get } = Ember;

export default Controller.extend({
  hasContent: false,
  kind: 'text-timeline-item',

  actions: {
    cancelPost() {
      let text = document.querySelector('.writebox').value.trim();
      return this.transitionToRoute('index');
    },

    makePost() {
      let writeBox = document.querySelector('.writebox');
      let itemText = writeBox.value.trim();
      let kind = get(this, 'kind');

      let item = get(this, 'store').createRecord(kind, {
        kind,
        itemText,
      });
      item.save().
        then(i => {
          writeBox.value == null;
          return this.transitionToRoute('index');
        }).
        catch(e => console.error(e));
    },

    textEntered(event) {
      console.log("hello");
    }
  }
});
