module.exports = function(gulp, $, config) {
    // 浏览器同步配置
    // 静态网站监听
    const browserSync = require('browser-sync').create();
    gulp.task(config.tool.bowerSync.taskName, function() {
        browserSync.init({
            notify: false,
            port: config.tool.bowerSync.port,
            open: 'external', // 设置打开方式，默认为local
            // browser: ["chrome", "firefox"], // 可以设置多浏览器同时打开
            logPrefix: 'success', // 修改日志的文案
            ghostMode: false, // 禁用所有同步功能
            server: {
                baseDir: [config.rootBuild], // 监控多个文件的时候，默认读取第一个子元素里面的index 文件
                index: 'deploy_index.html'
                // routes: {
                // 	'/bower_components': 'bower_components',
                // }
            }
        });

        gulp.watch(config.build.sass.watchScope, [config.build.sass.taskName]).on('change', browserSync.reload);
        gulp.watch(config.build.html.watchScope, [config.build.html.taskName]).on('change', browserSync.reload);
        gulp.watch(config.build.babel.watchScope, [config.build.babel.taskName]).on('change', browserSync.reload);
    });

    // 动态网站监听配置
    gulp.task('proxy', function() {
        console.log(config.rootSrc)
        browserSync.init({
            proxy: 'http://localhost:55555'
        });
    });

}
