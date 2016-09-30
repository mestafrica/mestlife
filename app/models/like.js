import DS from 'ember-data';
import ReactionableIdentifierAttributes from 'mestlife/mixins/reactionable-identifier-attributes';

const { Model, attr } = DS;

export default Model.extend(ReactionableIdentifierAttributes, {
  likedAt: attr('date', { defaultValue() { return new Date(); } }),
});
