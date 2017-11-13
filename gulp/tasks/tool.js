module.exports = function(gulp, $, config) {

    const del = require('del');
    // 删除文件
    gulp.task(config.tool.del.taskName, function() {
        del(config.tool.del.watchScope).then(paths => {
            $.util.log($.util.colors.red('Deleted folders'), $.util.colors.yellow(paths))
        });
    })

    // 删除文件的另一种写法
    gulp.task(config.tool.clean.taskName, del.bind(null, config.tool.del.watchScope));

    // 解析html中的 script 和 css, 对其进行引用, 暂时还没配置
    gulp.task('user', function() {
        return gulp.src('src/index.html')
            .pipe($.useref({
                searchPath: ['dist/styles']
            }))
            .pipe(gulp.dest('qq'));
    });

};
