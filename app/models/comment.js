import DS from 'ember-data';
import ReactionableIdentifierAttributes from 'mestlife/mixins/reactionable-dientifier-attributes';

const {
  Model,
  attr,
  belongsTo
} = DS;

export default Model.extend(ReactionableIdentifierAttributes, {
  reactionable: belongsTo('reactionable', { polymorphic: true }),

  content: attr('string'),
  createdAt: attr('date', { defaultValue() { return new Date(); } }),
  updatedAt: attr('date', { defaultValue() { return new Date(); } })
});
