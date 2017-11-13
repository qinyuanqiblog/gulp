module.exports = function(gulp, $, config) {

	// 取到所有的字体文件， 现在不知为啥在mainfilebower中取不出字体文件，所以才需要这一步， 以后有时间再研究
    gulp.task(config.build.font.taskName, function() {
		return gulp.src(config.build.font.watchScope)
		.pipe(gulp.dest(config.build.font.exportPath))
    })

    //编译sass 自动补全css3属性
    gulp.task(config.build.sass.taskName, function() {
        return gulp.src(config.build.sass.watchScope)
            .pipe($.sourcemaps.init())
            .pipe($.sass.sync({
                // 是否显示注释信息
                sourceComments: true,
                // 输出方式控制 nested, expanded, compact, compressed
                outputStyle: 'expanded ',
                // 最多保存多少位小数点
                precision: 10,
                // 引入文件设置
                includePaths: ['.']
            }).on('error', $.sass.logError))
            .pipe($.autoprefixer({
                browsers: ['last 4 Explorer versions', 'Firefox > 20', 'last 4 Chrome versions', 'last 4 Safari versions', 'last 4 Opera versions', 'iOS 7', 'Android >=4.0'],
            }))
            // 合并 sass 公共媒体查询条件
            .pipe($.groupCssMediaQueries())
            // css 排序
            .pipe($.csscomb())
            .pipe(gulp.dest(config.build.sass.exportPath));
    })

}
