const gulp = require('gulp');
const zip = require('gulp-zip');

gulp.task('default', () => {
  gulp.src(['index.js', 'node_modules/**'])
        .pipe(zip('soundzies.zip'))
        .pipe(gulp.dest('dist'));
});