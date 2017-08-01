var gulp = require('gulp'),
    watch = require('gulp-watch'),
	/*CSS*/
	compass = require('gulp-compass'),
	minifyCSS = require('gulp-minify-css'),
	/*IMAGES*/
	imagemin = require('gulp-imagemin'),
	clean = require('gulp-dest-clean'),
	/*JS*/
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	/*Notifications*/
	notify = require('gulp-notify');


/*IF ONLY GULP*/
gulp.task('default', function(){
	gulp.run('watch');
});

gulp.task('build', function(){
    gulp.run('styles');
    gulp.run('scripts');
    gulp.run('images');
});


/*WE BUILD THE APP*/
gulp.task('watch', ['styles','scripts','images'], function(){
    gulp.watch(['public/dev/sass/*/*.scss', 'public/dev/sass/*.scss'], ['styles']);
    gulp.watch(['public/dev/js/vendor/*.js', 'public/dev/js/class/*.js', 'public/dev/js/*.js'], ['scripts']);
    gulp.watch(['public/dev/img/*/*', 'public/dev/img/*'], ['images']);
});

/*MINIFY CSS and TRANSFROM SCSS in CSS*/
gulp.task('styles', function(){
	/*CLEAN FOLDER*/
	gulp.src('public/dev/sass')
		.pipe(clean('public/assets/css'));
	gulp.src('public/dev/sass/*.scss')
	    .pipe(compass({
	      css: 'public/assets/css',
	      sass: 'public/dev/sass',
	      images: 'public/dev/img',
	    }))
	    .pipe(gulp.dest('public/assets/css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('public/assets/css'))
		.pipe(notify({ message: 'Styles task complete' }));
});

/*JOIN ALL SCRIPTS AND MINIFY*/
gulp.task('scripts', function(){
	/*CLEAN FOLDER*/
	gulp.src('public/dev/js')
		.pipe(clean('public/assets/js'));
	gulp.src(['public/dev/js/vendor/*.js', 'public/dev/js/class/*.js', 'public/dev/js/*.js'])
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'))
	    .pipe(concat('scripts.js'))
	    .pipe(gulp.dest('public/assets/js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('public/assets/js'))
	    .pipe(notify({ message: 'Scripts task complete' }));
});

/*OPTIMIZE IMAGES*/
gulp.task('images', function(){
	/*CLEAN FOLDER*/
	gulp.src('public/dev/img')
		.pipe(clean('public/assets/img'));
	gulp.src(['public/dev/img/*/*', 'public/dev/img/*'])
        .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]))
        .pipe(gulp.dest('public/assets/img'))
        .pipe(notify({ message: 'Images task complete' }));
});