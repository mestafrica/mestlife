import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  /*
   * Results for the timeline should spot the `timeline-item` type
   * so we override `normalize` to set it appropriately. But because we
   * have different components for the different types of timeline items
   * we keep the original type in `kind`.
   */
  normalize(modelClass, resourceHash) {
    resourceHash.attributes.kind = resourceHash.type.split('-')[0];
    resourceHash.type = 'timeline-item';

    return this._super(modelClass, resourceHash);
  },

  serialize() {
    const json = this._super(...arguments);
    delete json.data.attributes.kind;
    return json;
  },
});
