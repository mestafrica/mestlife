import DS from 'ember-data';
import config from 'mestlife/config/environment';

export default DS.JSONAPIAdapter.extend({
  host: config.API_URL,
  namespace: config.API_VERSION,
});
