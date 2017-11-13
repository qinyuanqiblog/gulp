module.exports = function(gulp, $, config) {

    /**	套路名称：bower.json载入js和css, 所有的包必须都在 dependencies 下， 否则无法引入
       ***	套路属性：内功心法
       ***	套路招式：
       *** 第一步：需要在根目录下的package.json配置configuration属性， 具体可以参照官网：
       *** 第二步：需要页面有相关位置有占位符标识
       <!DOCTYPE html>
       <html>
       <head>
       	<title>My index</title>
       	<!-- bower:css -->
       	<!-- endbower -->

       	<!-- bower:js -->
       	<!-- endbower -->
       </head>
       <body>
       </body>
       </html>
       **/


    /* 因为这个和 gulp-file-include 有冲突， 所以暂时不用 */
    // const wiredep = require('wiredep').stream;
    // gulp.task(config.build.bower.taskName, function() {
    //     gulp.src(config.build.bower.watchScope)
    //         .pipe(wiredep({
    //             optional: 'configuration',
    //             goes: 'here'
    //         }))
    //         .pipe(gulp.dest(config.build.bower.exportPath));
    // });


    // 获取bower 的main 文件  比如 css  js 字体文件什么的
    const mainBowerFiles = require('main-bower-files');
    gulp.task(config.build.mainBowerFiles.taskName, function() {
        return gulp.src(mainBowerFiles())
            .pipe($.if(/\.eot$|\.svg$|\.ttf$|\.woff$|\.woff2$/, gulp.dest(config.build.mainBowerFiles.fontExportPath)))
            .pipe($.if(/\.css$/, gulp.dest(config.build.mainBowerFiles.cssExportPath)))
            .pipe($.if(/\.js$/, gulp.dest(config.build.mainBowerFiles.jsExportPath)))
    });

}
