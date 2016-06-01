var gulp = require('gulp');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var kss = require('kss');
var browserSync = require('browser-sync').create();

var options = {
  autoprefixer: {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
  },
  sass: {
    errLogToConsole: true,
    outputStyle: 'expanded'
  },
  styleguide: {
    source: './sass/',
    title: 'University of Portsmouth Living Styleguide',
    homepage: 'README.md',
    destination: './styleguide/',
    builder: './builder/',
    css: 'css/main.css'
  }
};

// converts sass into final stylesheet file
gulp.task('sass', function () {
  return gulp
    .src(options.styleguide.source + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(gulp.dest(options.styleguide.destination + 'css'))
    .pipe(browserSync.stream());
});

// generates the styleguide
gulp.task('styleguide', function() {
  return kss(options.styleguide);
});

// serve up using browsersync
gulp.task('serve', function() {
  browserSync.init({ server: options.styleguide.destination });

  // watch files and build/reload where needed
  gulp.watch(options.styleguide.source + '**/*.scss', ['sass', 'styleguide']);
  gulp.watch(options.styleguide.source + '**/*', ['styleguide']);
  gulp.watch(options.styleguide.destination + '*.html').on('change', browserSync.reload);
});

// when running `gulp`
gulp.task('default', ['sass', 'styleguide', 'serve'])
