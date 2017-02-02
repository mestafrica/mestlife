import Ember from 'ember';
const {
  Controller,
  computed,
  get,
  set,
  setProperties,
  inject: { service }
} = Ember;

export default Controller.extend({
  text: null,
  writer: service('writer'),
  kind: 'text-timeline-item',
  textPost: true,
  photoPost: false,
  audioPost: false,
  locationPost: false,
  photos: computed('writer.photos.[]', function() {
    return this.get('writer.photos');
  }),
  rows: computed('kind', function() {
    const kind = get(this, 'kind');
    return kind == 'text-timeline-item' ? 10 : 5;
  }),

  actions: {
    cancelPost() {
      let text = document.querySelector('.writebox').value.trim();
      if (text.length && confirm('Save to drafts?')) {
        // TODO: Save to drafts i.e. your localStorage
        console.log('Saved to drafts');
      }
      this.send('reset');
      return this.transitionToRoute('index');
    },

    makePost() {
      const kind = get(this, 'kind');
      const store = get(this, 'store');

      switch (kind) {
        case 'text-timeline-item':     return makeTextPost();
        case 'photo-timeline-item':    return makePhotoPost();
        case 'audio-timeline-item':    return makeAudioPost();
        case 'location-timeline-item': return makeLocationPost();
        default:                       break;
      }

      function makeTextPost() {
        let writeBox = document.querySelector('.writebox');
        let itemText = writeBox.value.trim();
        let item = store.createRecord(kind, {
          kind,
          itemText,
        });
        item.save().
          then(i => {
            writeBox.value = null;
            return this.transitionToRoute('posts.post', get(i, 'id'));
          }).
          catch(e => store.unloadRecord(item));
      }

      function makePhotoPost() { }
      function makeAudioPost() { }
      function makeLocationPost() { }
    },

    textEntered(event) {
      console.log("hello");
    },

    openFilePicker(event) {
      document.querySelector('.photo-picker').click();
    },

    updatePhotosPreview() {
      let files = document.querySelector('.photo-picker').files;
      if (!files.length) return;

      const writer = get(this, 'writer');
      writer.updatePreview(files);
      setProperties(this, {
        photoPost: true,
             kind: 'photo-timeline-item'
      });
    },

    removePhoto(event) {
      const loc = Number(event.target.dataset.value);
      const photos = get(this, 'photos');
      get(this, 'photos').removeAt(loc);
      if (!photos.length) {
        return this.send('reset');
      }
    },

    reset() {
      return setProperties(this, {
        photoPost: false,
        kind: 'text-timeline-item'
      });
    },
  }
});
