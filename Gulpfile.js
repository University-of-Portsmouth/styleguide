var gulp = require('gulp');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

var kss = require('kss');

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

// generates the styleguide
gulp.task('styleguide', function() {
  return kss(options.styleguide);
});

// converts sass into final stylesheet file
gulp.task('sass', function () {
  return gulp
    .src(options.styleguide.source + '**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass(options.sass).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(options.autoprefixer))
    .pipe(gulp.dest(options.styleguide.destination + 'css'));
});

// when running `gulp`
gulp.task('default', ['sass', 'styleguide']);
