// Include Gulp
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({camelize: true});
var browserSync = require('browser-sync').create();

// Styles
gulp.task('styles', function() {
	return gulp.src('./_dev/less/style.less')
		.pipe(plugins.less())
		.pipe(plugins.autoprefixer('last 2 versions'))
		.pipe(gulp.dest('./assets/css/build'))
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest('./assets/css/build'))
		.pipe(gulp.dest('./_site/assets/css/build'))
		.pipe(plugins.notify({message: 'Styles task complete'}))
		.pipe(plugins.filter('**/*.css')) // Filtering stream to only css files
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('scripts', function() {
	return gulp.src('./_dev/js/script.js')
		.pipe(plugins.concat('themes.js'))
		.pipe(gulp.dest('./assets/js/build'))
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('./assets/js/build'))
		.pipe(gulp.dest('./_site/assets/js/build'))
		.pipe(plugins.notify({message: 'Scripts task complete'}));
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify('Building Jekyll');
    var spawn = require('child_process').spawn;
    return spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browsersync', ['jekyll-build'], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        },
        // port: 4000,
        host: "localhost"
    });
});

// Watch
gulp.task('watch', function() {

	// Watch .less files
	gulp.watch('./_dev/less/*.less', ['styles']);

	// Watch .js files
	gulp.watch('./_dev/js/*.js', ['scripts']);

	// Watch .htm files
	gulp.watch(['_config.yml', 'index.html', '_includes/*.html', '_layouts/*.html', '*.md', '_posts/*'], ['jekyll-rebuild']);

});

gulp.task('default', ['styles', 'scripts', 'browsersync', 'watch']);
