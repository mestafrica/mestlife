import Ember from 'ember';
import DS from 'ember-data';

const { attr, hasMany } = DS;
const {
  Mixin,
  computed,
  get
} = Ember;

export default Mixin.create({
  comments: hasMany('comment'),
  likes: hasMany('like'),

  createdAt: attr('date', { defaultValue() { return new Date(); } }),
  updatedAt: attr('date', { defaultValue() { return new Date(); } }),

  // Computed
  edited: computed('updatedAt', function() {
    return get(this, 'updatedAt').getTime() !== get(this, 'createdAt').getTime();
  }),

});
