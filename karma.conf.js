module.exports = function(config){

  config.set({

    basePath : './',

    files : [
      // App js
      'app/**/*.js',

      // Vendor js
      'bower_components/angular/angular.js',
      'bower_components/angular-route/angular-route.js'

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
