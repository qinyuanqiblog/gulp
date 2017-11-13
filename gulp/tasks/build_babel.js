module.exports = function(gulp, $, config) {

    // 浏览器同步插件, 使用这个插件调试页面不ok的话就使用官网的指令来开启服务就好了
    const browserSync = require('browser-sync').create();

    // 编译babel js的相关处理
    gulp.task(config.build.babel.taskName, function() {
        return gulp.src(config.build.babel.watchScope)
            .pipe($.plumber())
            .pipe($.sourcemaps.init())
            .pipe($.babel({
                presets: ['es2015']
            }))
            // .pipe($.sourcemaps.write('../dist/sourcemaps'))
            .pipe(gulp.dest(config.build.babel.exportPath))
    });

    /**
     * esLint js 校验
     * @param files {string}	传入的文件，对当前文件进行相关操作
     */
    function esLint(files) {
        return gulp.src(files)
            .pipe($.eslint({
                fix: true
            }))
            .pipe(reload({
                stream: true,
                once: true
            }))
            .pipe($.eslint.format())
            .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
    }

}
