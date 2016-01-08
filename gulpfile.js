var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var nodemon = require('gulp-nodemon');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var reload = browserSync.reload;

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
    gulp.src([paths.source.base + '*.html'])
        .pipe(plumber())
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
    gulp.watch(paths.source.base + '*.html', ['html']);
    gulp.watch(paths.source.css + "*.scss", ['css']);
    gulp.watch(paths.source.js + '*.js', ['scripts']);

});
