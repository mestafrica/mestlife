/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'mestlife',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        Date: false,
        String: false,
        Function: false,
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    API_URL: process.env.API_URL || 'http://localhost:3000',
    API_VERSION: 'v1',
    COMMENT_THRESHOLD: 5,

    OM_AWS_ACCESS_KEY_ID: process.env.OM_AWS_ACCESS_KEY_ID,
    OM_AWS_SECRET_ACCESS_KEY: process.env.OM_AWS_SECRET_ACCESS_KEY,
    OM_AWS_REGION: process.env.OM_AWS_REGION,
    OM_AWS_S3_BUCKET: process.env.OM_AWS_S3_BUCKET,
    IMG_DIR: 'original',
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
