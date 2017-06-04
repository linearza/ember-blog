/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ember-blog',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    firebase: {
      apiKey: "AIzaSyB8XonRLT7ofxWO4dbWTpMaTRrpGQ2l8zQ",
      authDomain: "ember-blog-d8b5c.firebaseapp.com",
      databaseURL: "https://ember-blog-d8b5c.firebaseio.com",
      projectId: "ember-blog-d8b5c",
      storageBucket: "ember-blog-d8b5c.appspot.com",
      messagingSenderId: "692910046727"
    },

    contentSecurityPolicy: {
      'script-src': "'self' 'unsafe-eval' apis.google.com https://*.firebaseio.com",
      'frame-src': "'self' https://*.firebaseapp.com https://*.firebaseio.com",
      'connect-src': "'self' wss://*.firebaseio.com https://*.googleapis.com",
      'font-src': "'self' https://fonts.gstatic.com https://fonts.googleapis.com",
      'style-src': "'self' https://fonts.googleapis.com"
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
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
    ENV.locationType = 'hash';
    ENV.rootURL = '/ember-blog/';

  }

  return ENV;
};
