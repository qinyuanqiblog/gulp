module.exports = function(gulp, $, config) {
    // 压缩images
    gulp.task(config.build.img.taskName, () =>
		gulp.src(config.build.img.watchScope)
        .pipe($.imagemin())
        .pipe(gulp.dest(config.build.img.exportPath))
    );

}
