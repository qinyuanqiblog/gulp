module.exports = function(gulp, $, config) {
    /**  套路名称：向页面注入公共的部分
      ***  套路属性: 内功心法
      ***  套路招式：需要页面相关位置有占位符标识
      <!DOCTYPE html>
      <html>
      <head>
      	<title>My index</title>
      </head>
      <body>
      	 @@include('commom/siderbar.html')
      </body>
      </html>
      **/
    gulp.task(config.build.html.taskName, function() {
        gulp.src(config.build.html.watchScope)
            .pipe($.plumber())
            .pipe($.fileInclude({
                prefix: '@@',
                basepath: './'
            }))
            .pipe(gulp.dest(config.build.html.exportPath));
    });
}
