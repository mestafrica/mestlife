import Ember from 'ember';
import RSVP from 'rsvp';

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
      const writeBox = document.querySelector('.writebox');
      const itemText = writeBox.value.trim();
      const writer = get(this, 'writer');
      let f,
          __prmz;

      let __item = store.createRecord(kind, {
        kind,
        itemText,
        numberOfPhotosAttached: writer.photos.length
      });

      __prmz = __item.save();

      switch (kind) {
        case 'photo-timeline-item':    f = 'makePhotoPost';    break;
        case 'audio-timeline-item':    f = 'makeAudioPost';    break;
        case 'location-timeline-item': f = 'makeLocationPost'; break;
        default:                       f = 'makeTextPost';     break;
      }

      __prmz.
        then(__i => {
          writeBox.value = null;
          this.transitionToRoute('posts.post', get(__i, 'id'));
          return writer[f](__i);
        }).
        catch(__e => store.unloadRecord(__item));
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
