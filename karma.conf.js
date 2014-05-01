module.exports = function(config){

  config.set({

    basePath : './',

    files : [
      // Vendor js
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-mocks/angular-mocks.js',

      // App js (with top-level and modules loaded first)
      'app/*.js',
      'app/**/*-module.js',
      'app/**/*.js',

    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['PhantomJS'],

    plugins : [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-growl-reporter'
            ],

    reporters: ['dots', 'growl'],

    growlReporter: {
      reportEachFailure: true
    },

    colors: true,

    logLevel: config.LOG_INFO,

    singleRun: false

  });
};
