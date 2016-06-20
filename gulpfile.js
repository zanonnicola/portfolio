var gulp        = require('gulp');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var minifyCSS   = require('gulp-minify-css');
var gutil       = require('gulp-util');
var plumber     = require('gulp-plumber');
var notify      = require("gulp-notify");
var buffer      = require('vinyl-buffer');
var source      = require('vinyl-source-stream');
var sourcemaps  = require('gulp-sourcemaps');
var gulpFilter  = require('gulp-filter');
var watchify    = require('watchify');
var browserify  = require('browserify');

// Overwrting gulp.src for a better error management
var _gulpsrc = gulp.src;
gulp.src = function() {
    return _gulpsrc.apply(gulp, arguments)
    .pipe(plumber({
        errorHandler: function(err) {
            notify.onError({
                title:    "Gulp Error",
                message:  "Error: <%= error.message %>",
                sound:    "Bottle"
            })(err);
            this.emit('end');
        }
    }));
};

// Custom Options for Browserify
var customOpts = {
  entries: ['./js/init.js'],
  debug: true,
  cache: {},
  packageCache: {},
  plugin: [watchify]
};

var b = watchify(browserify(customOpts)); 

gulp.task('js', bundle); // so you can run `gulp js` to build the file
b.on('update', bundle); // on any dep update, runs the bundler
b.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return b.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./js/build'));
}

/**
 * Concatenate scripts from js into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('compress', function() {
  return gulp.src('./js/build/bundle.js')
    //.pipe(concat('concat.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/build/'));
});


/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass({
          sourceMap: 'sass',
          sourceComments: 'map'
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifyCSS({compatibility:"ie8"}))
        .pipe(gulp.dest('css'));
});

/**
 * Watch scss and scripts files for changes & recompile
 */
gulp.task('watch', function () {
    gulp.watch('scss/**/*.scss', ['sass']);
    // gulp.watch('js/**/*.js', ['scripts']);
    // gulp.watch(imgSrc, ['images']);
});

/**
 * Default task, running just `gulp` will compile the sass and create bundle.js
 * 
 */
gulp.task('default', ['js', 'watch']);
gulp.task('deploy', ['compress', 'sass']);