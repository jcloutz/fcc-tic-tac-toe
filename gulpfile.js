var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')(),
  exec = require('child_process').exec,
  fs = require('fs');

plugins.browserSync = require('browser-sync').create();
plugins.reload = plugins.browserSync.reload;

// base path and settings object
var BASE_PATH = process.cwd() + '/';
var settings = JSON.parse(fs.readFileSync(BASE_PATH + 'settings.json', {encoding: 'utf8'}));
// add paths to settings
settings.paths = {
  base: BASE_PATH,
  source: BASE_PATH + 'src/',
  output: BASE_PATH + settings.outputDir + '/',
}

process.env.deploy = false;

function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, settings);
}

gulp.task('scripts', getTask('scripts'));
gulp.task('css', getTask('css'));
gulp.task('html', getTask('html'));
gulp.task('external-css', getTask('external-css'));
gulp.task('external-js', getTask('external-js'));

gulp.task('watch', ['html', 'css', 'scripts'], function() {
  plugins.browserSync.init({
    server: {
      baseDir: settings.paths.output
    }
  });
  gulp.watch([settings.paths.source + '**/*.{html,jade,haml,md}', './template.html', './settings.json'], ['html']);
  gulp.watch(settings.paths.source + "css/**/*.{css,scss,styl}", ['css']);
  gulp.watch(settings.paths.source + 'scripts/*.js', ['scripts']);
});

gulp.task('build', ['html', 'css', 'scripts']);

gulp.task('gh-deploy', function() {
  process.env.deploy = true;
  gulp.run('build', function() {
    plugins.shell.task([
        'git push origin :gh-pages',
        'git subtree push --prefix output origin gh-pages'
      ], {
        ignoreErrors: true
    });
  })

});
// shell.task([
//   'git push origin :gh-pages',
//   'git subtree push --prefix output origin gh-pages'
// ]));
