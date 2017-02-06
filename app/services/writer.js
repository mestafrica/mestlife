import Ember from 'ember';
import RSVP from 'rsvp';
import bucket from 'mestlife/ext/s3';
import ENV from 'mestlife/config/environment';

const {
  Service,
  get,
  set,
  setProperties,
  inject: {service},
  run: {bind}
} = Ember;

export default Service.extend({
  photos: null,
  photoFiles: null,
  audio: null,
  location: null,
  store: service(),
  reader: new FileReader(),


  init() {
    setProperties(this, {
      photos: [],
      photoFiles: []
    });
    return this._super(...arguments);
  },

  updatePreview(files) {
    const photos = get(this, 'photos');
    const photoFiles = get(this, 'photoFiles');
    const __prmsz = [];

    let i, file, oUrl;
    for (i = 0; i < files.length; i++) {
      file = files[i];
      if (!/^image\//i.test(file.type)) continue;
      readFile(file).
        then(bind(this, addPreview(file)));
    }

    function addPreview(rawFile) {
      return function(f) {
        if (alreadyShowingInPreview(f)) return;
        photos.pushObject(f);
        photoFiles.push(rawFile);
      }
    }

    function readFile(file) {
      const reader = new FileReader();
      return new RSVP.Promise(function (resolve, reject) {
        reader.onerror = function(event) { return reject(event) }
        reader.onload  = function(event) {
          let {name, size, type} = file;
          let data = event.target.result,
              url  = URL.createObjectURL(file);
          return resolve({
            url,
            name,
            size,
            type,
            data,
          });
        }

        return reader.readAsDataURL(file);
      });
    }

    function alreadyShowingInPreview(t) {
      let matched = false;
      let apropos = photos.
                      filter(function(s) {
                        return s.size === t.size &&
                               s.type === t.type &&
                               s.data.length === t.data.length;
                      });

      if (!apropos.length) return false;

      let l = t.data.length;
      let p = []; p.length = 4;
      let y = Math.floor(l/4);
      let o, i, idx;

      for (i = 0; i < 4; i++) {
        o = i*y;
        p[i] = [
                 o+Math.floor(Math.random()*y),
                 o+Math.floor(Math.random()*y)
               ].sort();
      }

      for (i = 0; i < apropos.length; i++) {
        let u = apropos[i];
        if (randomSample(t.data,p) === randomSample(u.data,p))
          return true;
      }
      return false;
    }

    function randomSample(w, v) {
      return v.
        map(function(i) { return w.substr(i[0], i[1]) }).
        join('');
    }
  },

  makePhotoPost(post) {
    const store = get(this, 'store');
    const photos = get(this, 'photos');
    const photoFiles = get(this, 'photoFiles');
    let __prmsz = [],
        p,
        filename,
        file,
        photo;

    for (let i = 0; i < photos.length; i++) {
      photo = photos[i];
      file = photoFiles[i];
      filename = `${ENV.IMG_DIR}/${UUIDjs.create()}.${photo.name.split('.').pop()}`.toLowerCase();
      bucket.upload({
          Key: filename,
          Body: file,
          ContentType: file.type
        },
        function() {});

      p = store.createRecord('photo', {
        url: filename,
        size: photo.size,
        originalFileName: photo.name,
        photoTimelineItem: post,
      });

      __prmsz.push(p.save());
    }

    RSVP.all(__prmsz).catch(e => store.deleteRecord(post));
  },

  makeTextPost() { return; }
});
