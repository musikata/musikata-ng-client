var gulp = require('gulp');
var plugins = require("gulp-load-plugins")({lazy:false});

var paths = {
  'app:js': [
    '!./app/**/*_test.js', 
    './app/**/*.js'
  ],

  'app:index': ['./app/index.html'],

  'app:templates': [
    '!./app/index.html',
    './app/**/*.html'
  ],

  'vendor:js': [
    '!./bower_components/**/*.min.js',
    './bower_components/**/*.js'
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
  gulp.src(paths['app:index'])    
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
    ], function(event) {
      return gulp.src(event.path)
      .pipe(plugins.connect.reload());
    });
    gulp.watch(paths['app:js'],['app:js']);
    gulp.watch(paths['app:templates'],['app:templates']);
    gulp.watch(paths['app:index'],['app:index']);

});

  port: 9000,
  livereload: true
}));

gulp.task('build', [
  'app:js',
  'vendor:js',
  'app:templates',
  'app:index',
]);

gulp.task('watch', [
  'build',
  'connect',
  'watch'
]);
