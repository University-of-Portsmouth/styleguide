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
  styleguide: {
    source: './source/',
    title: 'Living Styleguide',
    homepage: 'README.md',
    destination: './styleguide/',
    builder: './builder/',
    css: 'css/main.css'
  }
};

var stylesheets = [
  options.styleguide.source + '**/*.scss',
  './node_modules/bootstrap-sass/assets/stylesheets'
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
  gulp.watch(options.styleguide.builder + '/kss-assets/kss.scss', ['styleguide-sass']);
  gulp.watch([options.styleguide.source + '**/*', options.styleguide.builder + 'kss-assets/kss.css'], ['styleguide']);
  gulp.watch(options.styleguide.destination + '*.html').on('change', browserSync.reload);
});

// when running `gulp build` for a static build
gulp.task('build', ['sass', 'styleguide-sass', 'styleguide']);

// when running `gulp` to build, watch and re-build
gulp.task('default', ['build', 'serve']);
