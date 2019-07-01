const gulp = require("gulp");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const watch = require("gulp-watch");

gulp.task("watch", function() {
  watch(["./src/*.css"], () => {
    return gulp
      .src([
        "./src/start.css",
        "./src/cover.css",
        "./src/works.css",
        "./src/about.css",
        "./src/skills.css",
        "./src/contact.css",
        "./src/media.css"
      ])
      .pipe(concat("index.css"))
      .pipe(cleanCSS())
      .pipe(gulp.dest("./public/"));
  });
});
