import DS from 'ember-data';
import ReactionableIdentifierAttributes from 'mestlife/mixins/reactionable-identifier-attributes';

const { Model, attr } = DS;

export default Model.extend(ReactionableIdentifierAttributes, {
  content: attr('string'),
  createdAt: attr('date', { defaultValue() { return new Date(); } }),
  updatedAt: attr('date', { defaultValue() { return new Date(); } }),
});
