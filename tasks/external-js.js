var fs = require('fs');

module.exports = function(gulp, plugins, settings) {
  return function() {
    /**
     * Adds external js file to the settings.json file.
     *
     * @param  string   --src       url to script location
     */
    gulp.task('external-js', function(v) {
      var script = plugins.util.env.add;
      if(script !== undefined) {
        var options = JSON.parse(fs.readFileSync(settings.paths.base + 'settings.json', {encoding: 'utf8'}));
        options.javascript.external.push(script);
        fs.writeFileSync(
          settings.paths.base + 'settings.json',
          JSON.stringify(options, null, 2)
        );
        console.log('settings.json updated!');
      }
    });
  }
};
