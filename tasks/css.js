var path = require('path');

module.exports = function(gulp, plugins, settings) {
  return function() {
    gulp.task('css', function () {
      return gulp.src(settings.paths.source + 'css/*.{css,scss}')
        .pipe(plugins.plumber())
        .pipe(plugins.sass({
          outputStyle: 'expanded',
          sourceComments: 'map',
          errLogToConsole: true,
          onError: function(err) {
            return notify().write(err);
          }
        }))
        .pipe(plugins.if(settings.css.autoprefixer, plugins.autoprefixer("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR")))
        .pipe(gulp.dest(settings.paths.output + '/css/'))
        .pipe(plugins.browserSync.stream());
    });
  }
}
