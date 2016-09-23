import Ember from 'ember';
import DS from 'ember-data';

const { belongsTo, attr } = DS;

export default Ember.Mixin.create({
  reactionable: belongsTo('reactionable', { polymorphic: true }),
  reactionableId: attr('string'),
  reactionableType: attr('string'), // This property is used to determine
                                    // the subclass of `reactioanble`. It's
                                    // deleted before save, in the serializer.
});
