module.exports = function(gulp, $, config) {


    // css压缩
    gulp.task(config.dist.css.taskName, function() {
        return gulp.src(config.dist.css.watchScope)
            .pipe($.cssnano())
            .pipe(gulp.dest(config.dist.css.exportPath))
    });

    // js压缩
    gulp.task(config.dist.js.taskName, function() {
        return gulp.src(config.dist.js.watchScope)
            .pipe($.uglify({
                compress: {
                    drop_console: true
                }
            }))
            .pipe(gulp.dest(config.dist.js.exportPath))
    });

    // html压缩
    gulp.task(config.dist.html.taskName, function() {
        return gulp.src(config.dist.html.watchScope)
            .pipe($.htmlmin(config.tool.compressHtmlOptions))
            .pipe(gulp.dest(config.dist.html.exportPath))
    });


}
