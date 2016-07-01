var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var kss = require('kss');
var browserSync = require('browser-sync').create();
var copy = require('gulp-copy');
var rename = require('gulp-rename');

var options = {
  autoprefixer: {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  },
  styleguide: {
    source: './source/',
    title: 'Living Styleguide',
    homepage: 'README.md',
    destination: './styleguide/',
    builder: './builder/',
    css: 'css/main.css',
    js: 'js/main.min.js'
  }
};

var bootstrapPath = './node_modules/bootstrap-sass/assets/';

var stylesheets = [
  options.styleguide.source + '**/*.scss',
  bootstrapPath + 'stylesheets'
];

var scripts = [
  // local scripts

  // 'scripts/**/*.js'

	// bootstrap

	// bootstrapPath + 'javascripts/bootstrap/affix.js',
	// bootstrapPath + 'javascripts/bootstrap/alert.js',
	// bootstrapPath + 'javascripts/bootstrap/button.js',
	// bootstrapPath + 'javascripts/bootstrap/collapse.js',
	bootstrapPath + 'javascripts/bootstrap/dropdown.js',
	// bootstrapPath + 'javascripts/bootstrap/modal.js',
	// bootstrapPath + 'javascripts/bootstrap/popover.js',
	// bootstrapPath + 'javascripts/bootstrap/scrollspy.js',
	// bootstrapPath + 'javascripts/bootstrap/tab.js',
	// bootstrapPath + 'javascripts/bootstrap/tooltip.js',
	// bootstrapPath + 'javascripts/bootstrap/transition.js',
];

options.sass = {
  errLogToConsole: true,
  includePaths: stylesheets
};

// converts sass into final stylesheet file
gulp.task('sass', function () {
  return gulp
    .src(options.styleguide.source + 'main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(options.styleguide.destination + 'css'))
    .pipe(browserSync.stream());
});

// converts scripts into final minified file
gulp.task('scripts', function(){
	return gulp
    .src(scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(options.styleguide.destination + 'js'))
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(options.styleguide.destination + 'js'))
    .pipe(browserSync.reload({ stream: true }));
});


// copies images to styleguide
gulp.task('copy-images', function(){
  return gulp.src(options.styleguide.source + 'images/**/*')
    .pipe(copy(options.styleguide.destination, { prefix: 1 }));
});

// copies fonts to styleguide
gulp.task('copy-fonts', function(){
  return gulp.src(options.styleguide.source + 'fonts/**/*')
      .pipe(copy(options.styleguide.destination, { prefix: 1 }));
});


// generates the styleguide
gulp.task('styleguide', function() {
  return kss(options.styleguide);
});

// converts sass for the styleguide
gulp.task('styleguide-sass', function () {
  return gulp
    .src(options.styleguide.builder + 'kss-assets/kss.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(options.styleguide.builder  + 'kss-assets'))
    .pipe(browserSync.stream());
});

// serve up using browsersync
gulp.task('serve', function() {
  browserSync.init({ server: options.styleguide.destination });

  // watch files and build/reload where needed
  gulp.watch(options.styleguide.source + '**/*.scss', ['sass', 'styleguide']);
  gulp.watch(scripts, ['js']);
  gulp.watch(options.styleguide.source + 'images/**/*', ['copy-images']);
  gulp.watch(options.styleguide.builder + '/kss-assets/kss.scss', ['styleguide-sass']);
  gulp.watch([options.styleguide.source + '**/*', options.styleguide.builder + 'kss-assets/kss.css'], ['styleguide']);
  gulp.watch(options.styleguide.destination + '*.html').on('change', browserSync.reload);
});

// when running `gulp build` for a static build
gulp.task('build', ['sass', 'styleguide-sass', 'scripts', 'styleguide', 'copy-images', 'copy-fonts']);

// when running `gulp` to build, watch and re-build
gulp.task('default', ['build', 'serve']);
