// include gulp
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var less = require('gulp-less');
var path = require('path');
var nodemon = require('gulp-nodemon');

gulp.task('fonts', function() {
    return gulp.src('./public/fonts')
               .pipe(gulp.dest('./public/build'));
});

gulp.task('less', function () {
    return gulp.src('./public/less/main.less')
        .pipe(less({
            paths: [ path.join(__dirname, 'less', 'includes') ]
        }))
        .pipe(gulp.dest('./public/build'));
});

gulp.task('scripts', function() {
    var b = browserify({
        entries: "./public/javascripts/vanilla.bootstrap.js",
        basedir: '.'
    });

    return b.bundle()
            .pipe(source('vanilla.bootstrap.js'))
            .pipe(buffer())
            .pipe(gulp.dest("./public/build/"));
});

// default gulp task
gulp.task('default', ['fonts', 'less', 'scripts'], function() {
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'bin/www',
        ignore: ['node_modules']
    })
})

gulp.task('watch', function() {
    // watch for CSS changes
    gulp.watch('./public/less/**/*.less', ['less']);

    gulp.watch('./public/javascripts/**/*.js', ['scripts']);
});

gulp.task('run', function() {
    gulp.start('nodemon', 'watch');
});