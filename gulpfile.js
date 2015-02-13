var gulp = require('gulp')
var typescript = require('gulp-typescript')
var concat = require('gulp-concat')
var jade = require('gulp-jade')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')

gulp.task('typescript-compile', function(){
  gulp.src(['src/ts/*.ts'])
    .pipe(typescript({ target: "ES5", removeComments: true, sortOutput: true }))
    .js 
    .pipe(concat("index.js"))
    .pipe(gulp.dest('lib/'))
})

gulp.task('jade-compile', function(){
  var YOUR_LOCALS = {}
  gulp.src(['src/jade/*.jade'])
    .pipe(jade({ locals: YOUR_LOCALS, pretty: true }))
    .pipe(gulp.dest('public/'))
})

gulp.task('browserify', function(){
  browserify({ entries: ['./lib/index.js'], debug: true  })
    .bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(gulp.dest('public/'))
})

gulp.task('watch', function(){
  gulp.watch('src/ts/*.ts', ['typescript-compile'])
  gulp.watch('src/jade/*.jade', ['jade-compile'])
  gulp.watch('lib/*.js', ['browserify'])
})

gulp.task('build', ['typescript-compile', 'jade-compile', 'browserify'])
