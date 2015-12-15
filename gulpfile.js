var gulp = require('gulp');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat');

gulp.task('js', function () {
	gulp.src('assets/react/**/*.js')
		.pipe(babel())
		.pipe(gulp.dest('public/react'));

});

gulp.task('browserify:js', function () {
	browserify({entries: 'assets/react/app.js'})
		.transform(
			babelify.configure({
    			plugins: ["object-assign"]
    		})
    	)
		.bundle()
		.pipe(source('app.js'))
		.pipe(gulp.dest('public/react/'));
});

gulp.task('sass', function () {
	gulp.src('assets/stylesheets/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/stylesheets/'));
});

gulp.task('copyvendor', function () {
	gulp.src('assets/vendor/**/*.*')
		.pipe(gulp.dest('public/'));
});

// gulp.task('watch', function () {
// 	gulp.watch(["assets/react/**/*.js"], ["js", "browserify:js"]);
// 	gulp.watch('assets/stylesheets/**/*.scss', ['sass']);
// });

gulp.task('default', ['js', 'sass', 'browserify:js', "copyvendor"]);
