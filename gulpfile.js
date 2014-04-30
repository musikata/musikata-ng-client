var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});

var paths = {
  'app:js': [
    '!./app/**/*_test.js',
    // order matters, load app & modules first.
    './app/app.js',
    './app/**/*-module.js',
    './app/**/*.js'
  ],

  'app:index': ['./app/index.html'],

  'app:templates': [
    '!./app/index.html',
    './app/**/*.html'
  ],

  'vendor:js': [
    './bower_components/angular/angular.js',
    './bower_components/angular-ui-router/release/angular-ui-router.js'
  ]
};


gulp.task('app:js', function(){
  gulp.src(paths['app:js'])
  .pipe(plugins.jshint())
  .pipe(plugins.jshint.reporter('default'))
  .pipe(plugins.concat('app.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('app:templates', function(){
  gulp.src(paths['app:templates'])
  .pipe(plugins.angularTemplatecache('templates.js',{standalone:true}))
  .pipe(gulp.dest('./build'));
});

gulp.task('app:index', function() {
  console.log('indexo');
  gulp.src(paths['app:index'])    
  .pipe(plugins.inject(gulp.src(paths['app:js'], {read: false})))
  .pipe(gulp.dest('./build'));
});


gulp.task('vendor:js', function(){
  gulp.src(paths['vendor:js'])
  .pipe(plugins.concat('lib.js'))
  .pipe(gulp.dest('./build'));
});

gulp.task('watch',function(){
  gulp.watch([
    'build/**/*.html',        
    'build/**/*.js',
    'build/**/*.css'        
    ].concat(paths['app:js']), function(event) {
      return gulp.src(event.path)
      .pipe(plugins.connect.reload());
    });
    //gulp.watch(paths['app:js'],['app:js']);
    gulp.watch(paths['app:templates'],['app:templates']);
    gulp.watch(paths['app:index'],['app:index']);
});

gulp.task('build', [
  'app:js',
  'vendor:js',
  'app:templates',
  'app:index',
]);

gulp.task('connect', function(){
  plugins.connect.server({
    root: ['./'],
    port: 9000,
    livereload: true
  })
});

gulp.task('serve', [
  'build',
  'connect',
  'watch'
]);

