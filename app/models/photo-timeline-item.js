import DS from 'ember-data';
import TimelineItem from 'mestlife/mixins/timeline-item';

const {
  attr,
  Model,
  hasMany
} = DS;

export default Model.extend(TimelineItem, {
  numberOfPhotosAttached: attr('number'), // cache number of photos user tried to upload
  photos: hasMany('photo')
});
