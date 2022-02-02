// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const concat = require('gulp-concat')
const postcss = require('gulp-postcss')
const replace = require('gulp-replace')
const sass = require('gulp-sass')(require("sass"))
const uglify = require('gulp-uglify')
const browserSync = require('browser-sync').create()

// File path variables
const files = {
    scssPath: "src/scss/**/*.scss",
    jsPath: "src/js/**/*.js"
}

// Sass task
function scssTask() {
    return src(files.scssPath)
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest("dist"))
        .pipe(browserSync.stream())
}

// JS task
function jsTask() {
    return src(files.jsPath)
        .pipe(concat("script.js"))
        .pipe(uglify())
        .pipe(dest("dist"))
        .pipe(browserSync.stream())
}

// Cachebusting task
const cbString = new Date().getTime()
function cacheBustTask() {
    return src(["index.html"])
        .pipe(replace(/cb=\d+/g, "cb=" + cbString))
        .pipe(dest("."))
}

// Watch task
function watchTask() {
    watch([files.scssPath, files.jsPath],
        parallel(scssTask, jsTask))
}

function browserSyncWatchTask() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    })
    watch("./*.html").on("change", browserSync.reload)
    watch(files.scssPath, scssTask)
    watch(files.jsPath, jsTask)
}

// Default task
exports.default = series(
    parallel(scssTask, jsTask),
    cacheBustTask,
    watchTask
)

exports.browserSync = browserSyncWatchTask