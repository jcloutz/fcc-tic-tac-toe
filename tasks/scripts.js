module.exports = function(gulp, plugins, settings) {
  return function() {
    gulp.task('scripts', () => {
      return gulp.src(settings.paths.source+'scripts/*.js')
        .pipe(plugins.plumber())
        .pipe(plugins.babel({
          presets: ['react', 'es2015']
        }))
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failOnError())
        .pipe(gulp.dest(settings.paths.output + '/scripts'))
        .pipe(plugins.browserSync.stream());
    });
  }
};
