'use strict';
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('watch-src', () => gulp.watch('./src/**/*.js', ['build-local']));

gulp.task('build', () => {
  return gulp.src('./src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('./lib'));
});

gulp.task('copy-package-json', () => {
  return gulp.src('./package.json')
      .pipe(gulp.dest('./lib'));
});

gulp.task('default', ['build', 'copy-package-json', 'watch-src']);
