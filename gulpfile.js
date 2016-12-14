const gulp = require('gulp'),
	  pug = require('gulp-pug'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  gutil = require('gulp-util'),
	  plumber = require('gulp-plumber'),
	  newer = require('gulp-newer');

gulp.task('default', function() {
	gulp.watch('app/pug/**/*.pug', ['pug']);
	gulp.watch('app/sass/**/*.sass', ['sass']);
});

// HTML
gulp.task('pug', function() {
	return gulp.src(['app/pug/**/*.pug', '!app/pug/**/_*.pug'])
		.pipe(newer('app/pug/**/*.pug'))
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err.message);
			}
		}))
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest('app/'));
});

// Style
gulp.task('sass', function() {
    return gulp.src('app/sass/*.sass')
    	.pipe(newer('app/sass/*.sass'))
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err.message);
			}
		}))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('app/css'));
});