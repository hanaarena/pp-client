// include gulp
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
	gulp.src('./public/less/main.less')
		.pipe(less({}))
		.pipe(gulp.dest('./public/build/'));
});

gulp.task('scripts', function() {
    var b = browserify({
        entries: "./public/javascripts/ppclient.bootstrap.js",
        basedir: '.'
    });

    return b.bundle()
            .pipe(source('ppclient.bootstrap.js'))
            .pipe(buffer())
            .pipe(gulp.dest("./public/build/"));
});

// default gulp task
gulp.task('default', ['less', 'scripts'], function() {
});


gulp.task('watch', function() {
    // watch for CSS changes
    gulp.watch('./public/less/**/*.less', ['less']);

    gulp.watch('./public/javascripts/**/*.js', ['scripts']);
});
