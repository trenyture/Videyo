var gulp = require('gulp'),
	/*CSS*/
	compass = require('gulp-compass'),
	minifyCSS = require('gulp-minify-css'),
	path = require('path'),
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
	gulp.run('build');
});

/*WE BUILD THE APP*/
gulp.task('build', function(){
	gulp.run('styles', 'scripts', 'images');
});

/*MINIFY CSS and TRANSFROM SCSS in CSS*/
gulp.task('styles', function(){
	/*CLEAN FOLDER*/
	gulp.src('assets/sass')
		.pipe(clean('src/css'));
	gulp.src('assets/sass/*.scss')
	    .pipe(compass({
	      css: 'src/css',
	      sass: 'assets/sass',
	      images: 'assets/images',
	    }))
	    .pipe(gulp.dest('src/css'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('src/css'))
		.pipe(notify({ message: 'Styles task complete' }));
});

/*JOIN ALL SCRIPTS AND MINIFY*/
gulp.task('scripts', function(){
	/*CLEAN FOLDER*/
	gulp.src('assets/script')
		.pipe(clean('src/js'));
	gulp.src(['./assets/script/vendor/*.js', './assets/script/*.js'])
	    .pipe(jshint())
	    .pipe(jshint.reporter('default'))
	    .pipe(concat('main.js'))
	    .pipe(gulp.dest('src/js'))
	    .pipe(uglify())
	    .pipe(gulp.dest('src/js'))
	    .pipe(notify({ message: 'Scripts task complete' }));
});

/*OPTIMIZE IMAGES*/
gulp.task('images', function(){
	/*CLEAN FOLDER*/
	gulp.src('assets/images')
		.pipe(clean('src/img'));
	gulp.src('assets/images/*')
        .pipe(imagemin([imagemin.gifsicle(), imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()]))
        .pipe(gulp.dest('src/img'))
        .pipe(notify({ message: 'Images task complete' }));
});
