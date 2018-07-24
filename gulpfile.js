// Node/Gulp Utilities
var gulp = require('gulp');
var log = require('fancy-log');
var c = require('chalk');
var plumber = require('gulp-plumber');
var spawn = require('child_process').spawn;
var gulpif = require('gulp-if');

// Development Tools
var bs = require('browser-sync');
var reload = bs.reload;
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var uncss = require('uncss').postcssPlugin;
var prefix = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var taskListing = require('gulp-task-listing');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var modernizr = require('gulp-modernizr');


//——————————————————————————————————————————————————————————————————————————————
// Debug info
//——————————————————————————————————————————————————————————————————————————————
if (process.env.NODE_ENV === 'production') {
  log(c.bgYellow.black('Production'), c.yellow('environment detected'));
} else {
  log(c.bgYellow.black('Local'), c.yellow('environment detected'));
}


//——————————————————————————————————————————————————————————————————————————————
// BrowserSync
//——————————————————————————————————————————————————————————————————————————————
gulp.task('dev:bs', () => {
  bs({
    server: './_site',
    open: false,
    port: '4000',
  });
});


//——————————————————————————————————————————————————————————————————————————————
// Jekyll for development
//
// Note: since this site deploys to GitHub Pages, the production build of Jekyll
// is not driven by Gulp. Only GitHub infrastructure can run it.
//——————————————————————————————————————————————————————————————————————————————
gulp.task('dev:jekyll', () => {
  bs.notify('Jekyll building...');

  return spawn('bundle', ['exec', 'jekyll', 'build', '--config=_config.yml,_config.dev.yml'], {stdio: 'inherit'})
    .on('close', reload);
});


//——————————————————————————————————————————————————————————————————————————————
// Sass
//——————————————————————————————————————————————————————————————————————————————
gulp.task('dev:sass', () => {
  bs.notify('Sass compiling...');

  return gulp.src(['assets/css/styles.scss'])
    .pipe(plumber())
    .pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      prefix({
        browsers: ['>0.333%', 'iOS 8'],
        cascade: false,
      }),
      uncss({
        html: ['_site/index.html', '_site/subscribe.html'],
        ignore: [/\.js/, /\.active/, /\.open/, /\.dropdown-backdrop/, /\.dropdown-btn/, /\#mc_embed_signup/],
      }),
      cssnano(),
    ]))
    .pipe(gulpif(process.env.NODE_ENV !== 'production', sourcemaps.write('./')))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('assets/css/'))
    .pipe(gulp.dest('_site/assets/css/'))
    .pipe(reload({stream: true}));
});


//——————————————————————————————————————————————————————————————————————————————
// Build Modernizr
//——————————————————————————————————————————————————————————————————————————————
gulp.task('dev:modernizr', function() {
  return gulp.src('assets/js/*.js')
    .pipe(modernizr('modernizr-output.js', {
      crawl: false,
      options: [
        'setclasses',
      ],
      tests: [
        'flexbox',
        'mediaqueries',
        'svg',
      ],
      excludeTests: [
        'dontmin', // this seems to be gulp-modernizr specific requirement
      ]
    }))
    .pipe(uglify({
      output: {
        comments: /^!/, // don't remove license or build URL
      },
    }))
    .pipe(gulp.dest('assets/js/'))
    .pipe(gulp.dest('_site/assets/js/'));
});


//——————————————————————————————————————————————————————————————————————————————
// JS Linting
//——————————————————————————————————————————————————————————————————————————————
// gulp.task('dev:js-lint', () => {
//   return gulp.src('_js/**/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter(stylish));
// });


//——————————————————————————————————————————————————————————————————————————————
// JS Bundling
//——————————————————————————————————————————————————————————————————————————————
// gulp.task('dev:js-bundle', () => {
//   return gulp.src([
//       './**/*.js',
//     ])
//     .pipe(concat('main.js'))
//     .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
//     .pipe(gulp.dest('js'))
//     .pipe(gulp.dest('_site/js'))
//     .pipe(reload({stream: true}));
// });

//——————————————————————————————————————————————————————————————————————————————
// JS Lint + Bundle
//——————————————————————————————————————————————————————————————————————————————
// gulp.task('dev:js', ['dev:js-lint', 'dev:js-bundle']);


//——————————————————————————————————————————————————————————————————————————————
// Build assets and start development server
//——————————————————————————————————————————————————————————————————————————————
gulp.task('dev', ['dev:sass', /*'dev:js',*/ 'dev:bs', 'dev:jekyll', 'watch']);


//——————————————————————————————————————————————————————————————————————————————
// Watch Files For Changes
//——————————————————————————————————————————————————————————————————————————————
gulp.task('watch', () => {
  // gulp.watch('_js/**/*.js', ['dev:js']);
  gulp.watch(['assets/**/*.scss'], ['dev:sass']);
  gulp.watch(['_config*', '**/*.{md,html,json}', '!_site/**/*.*', '!node_modules/**/*.*'], ['dev:jekyll']);
});


//——————————————————————————————————————————————————————————————————————————————
// Build site for a deploy to production
//——————————————————————————————————————————————————————————————————————————————
gulp.task('deploy', ['dev:sass', /*'dev:js'*/]);


//——————————————————————————————————————————————————————————————————————————————
// Offer help on command line
//——————————————————————————————————————————————————————————————————————————————
gulp.task('help', taskListing);


//——————————————————————————————————————————————————————————————————————————————
// Help task is default
//——————————————————————————————————————————————————————————————————————————————
gulp.task('default', ['help']);
