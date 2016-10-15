import ApplicationAdapter from './application';

const modelType = (record, type) => `${record._attributes.kind}-${type.modelName}`;

export default ApplicationAdapter.extend({
  updateRecord(store, type, snapshot) {
    const  modelName = modelType(snapshot, type);
    type.modelName = modelName;
    snapshot.modelName = modelName;

    return this._super(store, type, snapshot);
  },

  deleteRecord(store, type, snapshot) {
    const modelName = modelType(snapshot, type);
    type.modelName = modelName;
    snapshot.modelName = modelName;

    return this._super(...arguments);
  }
});
