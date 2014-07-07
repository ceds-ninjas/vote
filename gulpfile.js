// Constants
var DIST_DIR = 'dist',
	
	DIST_JS_APP_DIR = DIST_DIR + '/scripts',
	DIST_JS_LIB_CORE_DIR = DIST_DIR + '/vendor',
	DIST_JS_LIB_DIR = DIST_DIR + '/bower_components',
    DIST_CSS_DIR = DIST_DIR + '/css',
	
    DIST_HB_DIR = DIST_DIR + '/templates',
    DIST_HB_FILE = 'templates.js',
    
    DIST_SASS_DIR = DIST_DIR + '/sass',

    SOURCE_DIR = 'src',
    SOURCE_INDEX_HTML_FILE = 'index.html',
    SOURCE_JS_LIB_CORE_DIR = 'vendor',
    SOURCE_JS_APP_DIR = SOURCE_DIR + '/scripts',
    SOURCE_CSS_DIR = SOURCE_DIR + '/styles',
    SOURCE_SASS_DIR = SOURCE_DIR + '/sass',
    SOURCE_SASS_FILE = 'sass-app.css',
    SOURCE_HB_DIR = SOURCE_DIR + '/templates',
    SOURCE_HB_FILE = 'application.handlebars',
    SERVER_HOST = 'localhost',
    SERVER_HTTP_PORT = '3000';

// Dependencies
var browserSync = require('browser-sync'),
    gulp = require('gulp'),
    handlebars = require('gulp-ember-handlebars'),
    sass = require('gulp-sass'),
    rimraf = require('gulp-rimraf'),
    order = require('gulp-order'),
    changed = require('gulp-changed'),
    replace = require('gulp-replace'),
    inject = require('gulp-inject'),
    cssmin = require('gulp-cssmin'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    bower = require('gulp-bower-files'),
    concat = require('gulp-concat');

/**
 * [description]
 */
gulp.task('local:js-lib', function () {
    bower()
        .pipe(changed(DIST_JS_LIB_DIR))
        .pipe(gulp.dest(DIST_JS_LIB_DIR));
});

/**
 * [description]
 */
gulp.task('local:js-core-lib', function () {
    gulp.src(SOURCE_JS_LIB_CORE_DIR + '/*.js')
        .pipe(changed(DIST_JS_LIB_CORE_DIR))
        .pipe(gulp.dest(DIST_JS_LIB_CORE_DIR));
});

/**
 * [description]
 */
gulp.task('local:js-app', function () {
    gulp.src(SOURCE_JS_APP_DIR + '/**/*.js')
        .pipe(changed(DIST_JS_APP_DIR))
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(gulp.dest(DIST_JS_APP_DIR));
});

/**
 * [description]
 */
gulp.task('local:css', function () {
    gulp.src(SOURCE_CSS_DIR + '/**/*.css')
        .pipe(changed(DIST_CSS_DIR))
        .pipe(gulp.dest(DIST_CSS_DIR));
});

/**
 * [description]
 */
gulp.task('local:sass', function () {
    gulp.src(SOURCE_SASS_DIR + '/**/*.sass')
        .pipe(sass())
        .pipe(concat(SOURCE_SASS_FILE))
        .pipe(gulp.dest(SOURCE_SASS_DIR));
});

/**
 * [description]
 */
gulp.task('local:hb', function () {
    gulp.src(SOURCE_HB_DIR + '/**/*.hbs')
        .pipe(handlebars({
            outputType: 'browser'
        }))
        .pipe(concat(DIST_HB_FILE))
        .pipe(gulp.dest(DIST_HB_DIR));
});

/**
 * [description]
 * @return {object} Node.js Stream object
 */
gulp.task('local:build', [
		'local:js-core-lib',
        'local:js-lib',
        'local:js-app',
        'local:css',
        'local:sass',
        'local:hb'
    ], function () {
        gulp.src(SOURCE_DIR + '/' + SOURCE_INDEX_HTML_FILE)
            .pipe(
                inject(
                    bower({
                        read: false
                    }), {
                        starttag: '<!-- inject:js-lib -->',
                        ignorePath: SOURCE_DIR
                    }
                )
            )
            .pipe(
                inject(
                    gulp.src(SOURCE_JS_APP_DIR + '/**/*.js', {
                        read: false
                    }), {
                        starttag: '<!-- inject:js-app -->',
                        ignorePath: SOURCE_DIR
                    }
                )
            )
            .pipe(
                inject(
                    gulp.src(SOURCE_CSS_DIR + '/**/*.css', {
                        read: false
                    }), {
                        starttag: '<!-- inject:css -->',
                        ignorePath: SOURCE_DIR
                    }
                )
            )
            .pipe(
                inject(
                    gulp.src(SOURCE_SASS_DIR + '/' + SOURCE_SASS_FILE, {
                        read: false
                    }), {
                        starttag: '<!-- inject:sass -->',
                        ignorePath: SOURCE_DIR
                    }
                )
            )
            .pipe(gulp.dest(DIST_DIR))
            .pipe(browserSync.reload({stream:true}));
    }
);

/**
 * [description]
 * @return {object} Node.js Stream object
 */
gulp.task('clean', function () {
	rimraf(DIST_DIR);
});

/**
 * [description]
 */
gulp.task('local:server', function () {
    browserSync.init(null, {
        server: {
            baseDir: DIST_DIR
        },
        proxy: {
            host: SERVER_HOST,
            port: SERVER_HTTP_PORT
        }
    });
});

/**
 * [description]
 * @return {object} Node.js Stream object
 */
gulp.task('default', ['clean', 'local:server'], function () {
    gulp.start('local:build');
    gulp.watch(SOURCE_DIR + '/**/*', ['local:build']);
});
