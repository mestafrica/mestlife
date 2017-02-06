import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

export default Model.extend({
  url: attr('string'),
  size: attr('number'),
  originalFileName: attr('string'),
  photoTimelineItem: belongsTo('photo-timeline-item')
});
