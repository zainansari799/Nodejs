var gulp = require('gulp');
var ts = require('gulp-typescript');
var rimraf = require('gulp-rimraf');
var nodemon = require('gulp-nodemon');
 
gulp.task('cleandir', function(){
  return gulp.src('dest').pipe(rimraf());
}); 
 
gulp.task('buildserver', ['cleandir'],  function () {
  var tsResult = gulp.src('src/**/*.ts')
    .pipe(ts({
        module: 'CommonJS'
      }));
  return tsResult.js.pipe(gulp.dest('dest/'));
});


gulp.task('nodemon', ['buildserver', 'watch'], function(){
    nodemon({
        script: './dest/app.js'
    }).on('restart', function(){
        console.log('nodemon restarted server.js');
    })
})

gulp.task('watch', function() {
  gulp.watch('src/**/*.ts', ['buildserver']);
});

gulp.task('default', ['nodemon']);