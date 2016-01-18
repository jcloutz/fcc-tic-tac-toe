var fs = require('fs');
var del = require('del');
var path = require('path');
var beep = require('beepbeep');

module.exports = function(gulp, plugins, settings) {
  function moduleError(msg, cmd) {
    var message = '\n*****************************\n\n'
      + msg + ':\n'
      + '-------------------------------\n'
      + cmd
      + '\n\n*****************************';
      beep(2);

      return Error(message);
  }
  return function() {
    gulp.task('html', () => {
      var head = settings.html.head.join('\n');
      var htmlClasses = settings.html.html_classes.join(' ');
      var externalStyles = settings.css.external;
      if (settings.css_default !== false) {
        externalStyles.unshift(settings.css.defaults[settings.css.default]);
      }
      var stylesheets = externalStyles.map(function(stylesheet) {
        return '<link rel="stylesheet" href="' + stylesheet + '">';
      }).join('\n');


      var scripts = settings.javascript.external.map(function(script) {
        return '<script src="' + script + '"></script>';
      }).join('\n');

      gulp.src(settings.paths.base + 'template.html')
        .pipe(plugins.plumber())
        .pipe(plugins.replace('%TITLE%', settings.title))
        .pipe(plugins.replace('%CLASSES%', htmlClasses))
        .pipe(plugins.replace('%METATAGS%', head))
        .pipe(plugins.replace('%STYLESHEETS%', stylesheets))
        .pipe(plugins.replace('%SCRIPTS%', scripts))
        .pipe(plugins.replace('%BASE_URL%', process.env.deploy === 'true' ? settings.base_url : ''))
        .pipe(plugins.rename('template.html'))
        .pipe(gulp.dest(settings.paths.base + '.temp/'))
        .on('finish', function() {
          var template = fs.readFileSync(settings.paths.base + '.temp/template.html', {encoding: 'utf8'});
          compile(template);
          del([settings.paths.base + '.temp/']);
        });

        function compile(template) {
          gulp.src(settings.paths.source + '/**/*.{html,jade,haml,md}')
            .pipe(plugins.plumber())
            .pipe(plugins.tap(function(file, t) {
              var ext = path.extname(file.path);

              if (ext === '.jade' && plugins.jade !== undefined) {
                return t.through(plugins.jade, [{pretty: true}]);
              } else if (ext === '.jade' && plugins.jade === undefined) {
                throw moduleError(
                  'Jade is not configured. To use haml run the following command then re-rerun gulp',
                  'npm install --save-dev gulp-jade'
                );
              }

               if (ext === '.haml' && plugins.haml !== undefined) {
                return t.through(plugins.haml, [{ext: '.html'}]);
              } else if (ext === '.haml' && plugins.haml === undefined) {
                throw moduleError(
                  'Haml is not configured. To use haml run the following command then re-rerun gulp',
                  'npm install --save-dev gulp-haml'
                );
              }

              if (ext === '.md' && plugins.markdown !== undefined) {
                return t.through(plugins.markdown, []);
              } else if (ext === '.md' && plugins.markdown === undefined) {
                throw moduleError(
                  'Markdown is not configured. To use haml run the following command then re-rerun gulp',
                  'npm install --save-dev gulp-markdown'
                );
              }
            }))
            .pipe(plugins.each(function(content, file, callback) {
              var newContent = template.replace('%CONTENT%', content);
              callback(null, newContent);
            }))
            .pipe(gulp.dest(settings.paths.output))
            .pipe(plugins.browserSync.stream())
            .on('end', function() {
              del([settings.paths.base + '.temp/']);
            }).on('error', function(e) {
              console.log('error: ', e);
            });
        }
    });
  }; // end nested function
};
