import Ember from 'ember';

export default Ember.Mixin.create({
  reactionableId: attr('string'),
  reactionableType: attr('string'), // This property is used to determine
                                    // the subclass of `reactioanble`. It's
                                    // deleted before save, in the serializer.
});
