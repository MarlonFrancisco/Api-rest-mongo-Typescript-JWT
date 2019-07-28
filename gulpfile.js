const gulp = require('gulp');
const ts = require('gulp-typescript');
const clean = require('gulp-clean');

const tsProject = ts.createProject("./tsconfig.json");

gulp.task('compile', () => {
    return gulp.src("./lib/**/*.ts")
        .pipe(tsProject())
        .pipe(gulp.dest("dist"));
});

gulp.task('clean', () => {
    return gulp.src('dist')
        .pipe(clean());
});

gulp.task('hbs', () => {
    return gulp.src("./lib/**/*.handlebars")
        .pipe(gulp.dest("dist"));
});

const tasks = gulp.series("clean", "compile", "hbs");

gulp.task('watch', () => {
    return gulp.watch("./lib/**/*.ts", { event: "change"}, tasks);
});