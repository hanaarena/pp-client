// include gulp
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var path = require('path');
var nodemon = require('gulp-nodemon');

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

gulp.task('mainScript', function() {
	gulp.src('./public/javascripts/main.js')
		.pipe(uglify())
		// .pipe(concat('all.min.js'))
		.pipe(gulp.dest('./public/build/'));
	return ;
});

gulp.task('default', ['less', 'scripts', 'mainScript'], function() {
});

gulp.task('watch', function() {
    gulp.watch('./public/less/**/*.less', ['less']);
    gulp.watch('./public/javascripts/**/*.js', ['scripts']);
	gulp.watch('./public/javascripts/main.js', ['mainScript']);
});

gulp.task('nodemon', function () {
	nodemon({
		script: 'bin/www',
		ignore: ['node_modules']
	})
});

gulp.task('run', function() {
	gulp.start('nodemon', 'watch');
});