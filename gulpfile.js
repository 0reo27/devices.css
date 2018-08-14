var gulp = require('gulp');
var sass = require('gulp-sass');
var cleancss = require('gulp-clean-css');
var csscomb = require('gulp-csscomb');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('watch', function() {
    gulp.watch('./src/*.scss', ['build']);
});

gulp.task('build', function() {
    gulp.src('./src/*.scss')
        .pipe(
            sass({ outputStyle: 'compact', precision: 10 }).on(
                'error',
                sass.logError
            )
        )
        .pipe(autoprefixer())
        .pipe(csscomb())
        .pipe(gulp.dest('./dist'))
        .pipe(cleancss())
        .pipe(
            rename({
                suffix: '.min'
            })
        )
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['build']);

// Convert to EM task.
var postcss = require('gulp-postcss');
var pxtorem = require('postcss-pxtorem');
var replace = require('gulp-replace');

gulp.task('convertToEm', function() {
    var plugins = [
        pxtorem({
            replace: true,
            propList: [`*`]
        })
    ];
    return gulp
        .src('./src/*.scss')
        .pipe(
            sass({ outputStyle: 'compact', precision: 10 }).on(
                'error',
                sass.logError
            )
        )
        .pipe(postcss(plugins))
        .pipe(replace(/rem/g, `em`))
        .pipe(gulp.dest('srcEm'));
});
