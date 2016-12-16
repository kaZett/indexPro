const gulp = require('gulp4'),
	  pug = require('gulp-pug'),
	  sass = require('gulp-sass'),
	  autoprefixer = require('gulp-autoprefixer'),
	  gutil = require('gulp-util'),
	  plumber = require('gulp-plumber'),
	  newer = require('gulp-newer'),
	  bsync = require('browser-sync').create(),
	  del = require('del');

// Helpers
let plumberSetup = {
	errorHandler: function (err) {
		console.log(err.message);
	}
};

// HTML
gulp.task('pug', function() {
	return gulp.src(['app/pug/**/*.pug', '!app/pug/**/_*.pug'])
		.pipe(newer('app/pug/**/*.pug'))
		.pipe(plumber(plumberSetup))
		.pipe(pug({
			pretty: '\t'
		}))
		.pipe(gulp.dest('app/'));
});

// Style
gulp.task('sass', function() {
    return gulp.src('app/sass/*.sass')
    	.pipe(newer('app/sass/*.sass'))
		.pipe(plumber(plumberSetup))
		.pipe(sass())
		.pipe(autoprefixer({
			browsers: ['last 10 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('app/css'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch('app/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('app/sass/**/*.sass', gulp.series('sass'));
});

// Server
gulp.task('server', function() {
	bsync.init({
		server: {
			baseDir: 'app/'
		}
	});
	bsync.watch(['app/*.html', 'app/css/*.css']).on('change', bsync.reload);
});

// Clean
gulp.task('clean', function() {
	return del('build');
});

// Build
gulp.task('build', function() {
	return gulp.src(['app/**/*.*', '!app/sass/*.*', '!app/pug/*.*'])
		.pipe(gulp.dest('build'));
});

// Dev
gulp.task('dev', gulp.series('clean', 'build'));

// Default
gulp.task('default', gulp.parallel('watch', 'server'));