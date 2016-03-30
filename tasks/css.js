var path = require('path');

module.exports = function(gulp, plugins, settings) {
  return function() {
    gulp.task('css', function () {
      return gulp.src(settings.paths.source + 'css/*.styl')
        .pipe(plugins.plumber())
        .pipe(plugins.stylus())
        .pipe(plugins.if(settings.css.autoprefixer, plugins.autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR")))
        .pipe(gulp.dest(settings.paths.output + '/css/'))
        .pipe(plugins.browserSync.stream());
    });
  }
}
