import Ember from 'ember';
const { Controller, get } = Ember;

export default Controller.extend({
  kind: 'text-timeline-item',

  actions: {
    cancelPost() {
      let text = document.querySelector('.writebox').value.trim();
      if (text.length && confirm('Save to drafts?')) {
        // TODO: Save to drafts i.e. your localStorage
        console.log('Saved to drafts');
      }
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
          return this.transitionToRoute('posts.post', get(i, 'id'));
        }).
        catch(e => {
          console.error(e)
          return get(this, 'store').unloadRecord(item);
        });
    },

    textEntered(event) {
      console.log("hello");
    },

    openFilePicker(event) {
      document.querySelector('.photo-picker').click();
    },

    handleUpload() {
    }
  }
});
