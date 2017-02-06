import Ember from 'ember';
import ENV from 'mestlife/config/environment';
const { Object, set } = Ember;

AWS.config = new AWS.Config({
  accessKeyId: ENV.OM_AWS_ACCESS_KEY_ID,
  secretAccessKey: ENV.OM_AWS_SECRET_ACCESS_KEY,
  region: ENV.OM_AWS_REGION,
});

AWS.config.sslEnabled = true;
AWS.config.logger = console;

export default new AWS.S3({params: {BUCKET: ENV.OM_AWS_S3_BUCKET} });