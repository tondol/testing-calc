var gulp = require('gulp')
var typescript = require('gulp-typescript')
var concat = require('gulp-concat')
var jade = require('gulp-jade')

gulp.task('typescript-compile', function(){
  gulp.src(['src/ts/*.ts'])
    .pipe(typescript({ target: "ES5", removeComments: true, sortOutput: true }))
    .js 
    .pipe(concat("index.js"))
    .pipe(gulp.dest('public/'))
})

gulp.task('jade-compile', function(){
  var YOUR_LOCALS = {}
  gulp.src(['src/jade/*.jade'])
    .pipe(jade({ locals: YOUR_LOCALS, pretty: true }))
    .pipe(gulp.dest('public/'))
})

gulp.task('watch', function(){
  gulp.watch('src/ts/*.ts', ['typescript-compile'])
  gulp.watch('src/jade/*.jade', ['jade-compile'])
})

gulp.task('build', ['typescript-compile', 'jade-compile'])
