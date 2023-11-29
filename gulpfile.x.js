const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');
const connect = require('gulp-connect');
const modRewrite = require('connect-modrewrite');

// Define the paths for your application
const paths = {
  root: './',
  index: './index.html'
};

function scripts () {
  return gulp.src('_modules/misc/*.js')
      .pipe(minify({
          ext: {
              min: '.min.js'
          },
          ignoreFiles: ['-min.js']
      }))
      .pipe(gulp.dest('_modules/_min'))
}
gulp.task('min-js', function() {
  // return gulp.src('_modules/master/*.js')
  //     .pipe(minify({
  //         ext: {
  //             min: '.min.js'
  //         },
  //         ignoreFiles: ['-min.js']
  //     }))
  //     .pipe(gulp.dest('_modules/_min'))
});

// Task to serve the Vue app using BrowserSync
function serve() {
  // Serve files from the root directory of your Vue project
//   browserSync.init({
//     server: {
//       baseDir: './esmod/',
//     },
//   });

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

//   browserSync.init({
// server: {
//        baseDir: './esmod/',
//      },
//     proxy: 'localhost/esmod/' // Update with your CodeIgniter app's local URL
//   });

  gulp.watch('_modules/misc/*.js', scripts); 
  // Watch for changes in Vue app files and reload the browser
  gulp.watch('**/*.js').on('change', browserSync.reload);
  gulp.watch('**/*.html').on('change', browserSync.reload);
  gulp.watch('**/*.css').on('change', browserSync.reload);
  
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
