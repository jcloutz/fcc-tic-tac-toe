var gulp = require('gulp'),
    del = require('del'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    nodemon = require('gulp-nodemon'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    replace = require('gulp-replace'),
    reload = browserSync.reload,
    rename = require('gulp-rename'),
    fs = require('fs');

var paths = {
    source: {
        base: './src/',
        css: './src/css/',
        js: './src/js/',
    },
    output: {
        base: './output/',
        css: './output/css/',
        js: './output/js',
    }
}
gulp.task('clean', () => {
    return del(paths.output.base);
});

gulp.task('html', () => {
    var settings = JSON.parse(fs.readFileSync('./settings.json', {encoding: 'utf8'}));
    var content = fs.readFileSync(paths.source.base + 'index.html', {encoding: 'utf8'});

    var metatags = settings.html.metatags.join('\n');
    var htmlClasses = settings.html.classes.join(' ');
    var stylesheets = settings.css.map(function(stylesheet) {
      return '<link rel="stylesheet" href="' + stylesheet + '">';
    }).join('\n');
    console.log(htmlClasses);
    var scripts = settings.javascript.map(function(script) {
      return '<script src="' + script + '"></script>';
    }).join('\n');

    gulp.src('template.html')
        .pipe(plumber())
        .pipe(replace('%TITLE%', settings.html.title))
        .pipe(replace('%CLASSES%', htmlClasses))
        .pipe(replace('%METATAGS%', metatags))
        .pipe(replace('%STYLESHEETS%', stylesheets))
        .pipe(replace('%CONTENT%', content))
        .pipe(replace('%SCRIPTS%', scripts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(paths.output.base))
        .pipe(browserSync.stream());
})

gulp.task('scripts', () => {
    return gulp.src(paths.source.js+'*.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(gulp.dest(paths.output.js))
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    return gulp.src(paths.source.css + '*.scss')
        .pipe(plumber())
        .pipe(sass({outputStyle: 'expanded', sourceComments: 'map'}, {errLogToConsole: true}))
        .pipe(prefix("last 2 versions", "> 1%", "ie 8", "Android 2", "Firefox ESR"))
        .pipe(gulp.dest(paths.output.css))
        .pipe(browserSync.stream());
});

gulp.task('default', ['html', 'css', 'scripts'], function() {
    browserSync.init({
        server: {
            baseDir: paths.output.base
        }
    });
    gulp.watch([paths.source.base + 'index.html', 'template.html', 'settings.json'], ['html']);
    gulp.watch(paths.source.css + "*.scss", ['css']);
    gulp.watch(paths.source.js + '*.js', ['scripts']);

});
