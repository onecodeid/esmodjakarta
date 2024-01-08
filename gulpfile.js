const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
const connect = require('gulp-connect');
const modRewrite = require('connect-modrewrite');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const include_file = require('gulp-file-include')

// Define the paths for your application
const paths = {
  root: './',
  index: './index.html',
  srcScss: './src/assets/scss/compile/*.scss',
  destScss: './public/assets/css/'
};

function scripts () {
  return gulp.src('./src/assets/js/*.js')
      .pipe(minify({
          ext: {
              min: '.min.js'
          },
          ignoreFiles: ['-min.js']
      }))
      .pipe(gulp.dest('./public/assets/js'))
}

// Gulp task to compile SCSS
gulp.task('compile-scss', function () {
    return gulp.src(paths.srcScss)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.destScss))
      .pipe(browserSync.stream()); // Soft reload CSS changes;
  });
  
  // Gulp task to minify CSS
  gulp.task('minify-css', function () {
    return gulp.src(paths.destScss + '/*.css')
      .pipe(cleanCSS())
      .pipe(gulp.dest(paths.destScss))
      .pipe(browserSync.stream()); // Soft reload CSS changes;
  });

gulp.task('min-js', function() {
  return gulp.src('./src/assets/js/*.js')
      .pipe(minify({
          ext: {
              min: '.min.js'
          },
          ignoreFiles: ['-min.js']
      }))
      .pipe(gulp.dest('./public/assets/js'))      
      .pipe(browserSync.reload())
});

gulp.task('include', () => {
  return gulp.src('./src/html/*.html')
    .pipe(include_file({
      prefix: "@@",
      basepath: "@file"
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('includev2', () => {
  return gulp.src('./src/html/v2/*.html')
    .pipe(include_file({
      prefix: "@@",
      basepath: "@file"
    }))
    .pipe(gulp.dest('./public/v2'));
});

// Task to serve the Vue app using BrowserSync
function serve() {
  // Serve files from the root directory of your Vue project
//   browserSync.init({
//     server: {
//       baseDir: './esmod/',
//     },
//   });

// connect.server({
//   root: paths.root,
//   livereload: true,
//   port: 3000,
//   middleware: function () {
//     return [
//       // Modrewrite rule to redirect /esmod/ to the root
//       modRewrite(['^/esmod/(.*)$ /$1 [L]'])
//     ];
//   }
// });

  browserSync.init({
    // server: {
    //    baseDir: './esmod/',
    //  },
    proxy: 'localhost/esmod/' // Update with your CodeIgniter app's local URL
  });

    gulp.watch('./src/assets/js/*.js', scripts); 
    // gulp.watch('./src/html/partials/*.html', gulp.series('include'));
    // gulp.watch('./src/html/*.html', gulp.series('include'));
    gulp.watch('./src/html/', gulp.series('include'));
    gulp.watch('./src/html/v2', gulp.series('includev2'));
    // gulp.watch(paths.srcScss, gulp.series('compile-scss', 'minify-css'));
    gulp.watch('./public/*.html').on('change', browserSync.reload);
    gulp.watch('./public/v2/*.html').on('change', browserSync.reload);
    gulp.watch('./public/assets/css/*.css').on('change', browserSync.stream);
    gulp.watch('*.html').on('change', browserSync.reload);
//   gulp.watch('_modules/misc/*.js', scripts); 
  // Watch for changes in Vue app files and reload the browser
    gulp.watch('**/*.js').on('change', browserSync.reload);
  
//   gulp.watch('**/*.css').on('change', browserSync.reload);
  
  
}

// Gulp task to start the server
gulp.task('serve', function () {
  connect.server({
    root: paths.root,
    livereload: true,
    port: 3000,
    middleware: function () {
      return [
        // Modrewrite rule to redirect /esmod/ to the root
        modRewrite(['^/esmod/(.*)$ /$1 [L]'])
      ];
    }
  });
});

// Default task
exports.default = serve;
