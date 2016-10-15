import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  updateRecord(store, type, snapshot) {
    const modelName = `${snapshot._attributes.kind}-${type.modelName}`;
    type.modelName = modelName;
    snapshot.modelName = modelName;

    return this._super(store, type, snapshot);
  }
});
