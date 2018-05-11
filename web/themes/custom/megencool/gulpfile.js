'use strict';


var gulp = require('gulp');
var scss = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var sassGlob = require('gulp-sass-glob');
var stripCssComments = require('gulp-strip-css-comments');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('scss', function() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sassGlob())
    .pipe(stripCssComments())
    .pipe(sourcemaps.init())
    .pipe(scss({
      outputStyle: 'compact'
    }).on('error', scss.logError))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions', 'ie >= 10'] }) ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/css'));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('./src/scss/**/*.scss', ['scss'])
});
