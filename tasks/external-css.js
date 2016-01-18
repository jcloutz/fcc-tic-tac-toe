var fs = require('fs');

module.exports = function(gulp, plugins, settings) {
  return function() {
    /**
     * Adds external css file to the settings.json file.
     *
     * @param  string   --src       url to stylesheet location
     */
    gulp.task('external-css', function(v) {
      var css = plugins.util.env.add;
      if(css !== undefined) {
        var options = JSON.parse(fs.readFileSync(settings.paths.base + 'settings.json', {encoding: 'utf8'}));
        options.css.external.push(css);
        fs.writeFileSync(
          settings.paths.base + 'settings.json',
          JSON.stringify(options, null, 2)
        );
        console.log('settings.json updated!');
      }
    });
  }
};
