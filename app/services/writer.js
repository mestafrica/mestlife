import Ember from 'ember';
import RSVP from 'rsvp';

const {
  Service,
  get,
  set
} = Ember;

export default Service.extend({
  photos: null,
  reader: new FileReader(),

  init() {
    set(this, 'photos', []);
    return this._super(...arguments);
  },

  updatePreview(files) {
    const photos = get(this, 'photos');
    const promises = [];

    let i, file, oUrl;
    for (i = 0; i < files.length; i++) {
      file = files[i];
      if (!/^image\//i.test(file.type)) continue;
      promises.push(readFile(file));
    }

    RSVP.allSettled(promises).then(function(all) {
      all.forEach(function(r) {
        if (alreadyShowingInPreview(r.value)) return;
        photos.pushObject(r.value);
      });
    });

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
      let p = Array(4);
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
  }
});
