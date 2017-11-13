/*
 *-------------------------------------------------------------
 * @File  : gulp 入门配置， 参考yeomand的web-src项目， 适用于 前后端不分离和不使用 大型框架的项目
 * @Author: QinYuanqi
 * @Email : qinyuanqiuse@gmail.com
 * @GitHub: qinyuanqiblog.github.io
 * @Date  : 2017-03-07 07:36:27
 * @Last Modified by: QinYuanqi
 * @Last Modified time: 2017-09-30 17:34:12
 *-------------------------------------------------------------
 */

/** 关于目录的介绍

gulp
|-- dist   				存放临时文件
|	|-- fonts			存放网页字体
|	|-- images  		存放压缩后的图片
|	|-- js 				存放bebal编译过后的js文件目录
|	|-- scss  			存放sass编译后的css文件目录
|-- src 				存放源代码
|	|-- fonts			存放字体相关的
|	|-- images			存放图片的
|	|-- js 				存放js源码
|	|-- scss  			存放sass源码
|-- bower_components 	存放bower引入的项目    			根据bower.json生成
|-- node_modules	  	存放各种nodejs相关插件的地方		 根据package.json文件生成
|-- bowre.json 			bower配置文件
|-- gulpfile.js 		gulp配置文件
|-- package.json 	    npm配置文件

**/

// const config = require('config.js');


// 存放未编译的文件夹
const ROOT_DEV = 'src';
// 存放编译过后的文件夹
const ROOT_BUILD = 'dist';
// 存放打包后的文件夹
const ROOT_ZIP = 'zip';

const config = {

	rootDev: ROOT_DEV,
	rootBuild: ROOT_BUILD,
	rootZip: ROOT_ZIP,

	// 端口号设置
	port: 55555,

	// 未编译的路径
	source: {
		html: [
			ROOT_DEV + '/*.html',
			ROOT_DEV + '/**/*.html',
		],
		font: ROOT_DEV + '/fonts/*',
		scss: [
			ROOT_DEV + '/scss/*',
			ROOT_DEV + '/scss/**/*.scss',
		],
		js: ROOT_DEV + '/js/*',
		lib: ROOT_DEV + '/lib/*',
		image: ROOT_DEV + '/images/*'
	},

	// 编译过后的路径
	develop: {
		font: ROOT_BUILD + '/fonts',
		css: ROOT_BUILD + '/css',
		lib: ROOT_BUILD + '/lib',
		js: ROOT_BUILD + '/js',
		image: ROOT_BUILD + '/images'
	},
}

// 相关插件引入
const gulp = require('gulp');
// 删除文件插件
const del = require('del');
// 浏览器同步插件, 使用这个插件调试页面不ok的话就使用官网的指令来开启服务就好了
const browserSync = require('browser-sync').create();
// 自动加载package.json里面 如gulp-xx 相关插件
const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();

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
gulp.task('include', function () {

	gulp.src(config.source.html[0])
		.pipe($.plumber())
		.pipe($.fileInclude({
			prefix: '@@',
			basepath: './'
		}))
		.pipe(gulp.dest(config.rootBuild));
});

/**  套路名称：向页面注入js和css
***  套路属性: 内功心法
***  套路招式：需要页面相关位置有占位符标识
<!DOCTYPE html>
<html>
<head>
	<title>My index</title>
	<!-- common:css -->
	<link rel="stylesheet" href="/styles/aa.css">
	<!-- endinject -->

	<!-- index:css -->
	<link rel="stylesheet" href="/styles/qq.css">
	<!-- endinject -->
</head>
<body>
	<!-- common:js -->
	<script src="/scripts/aa.js"></script>
	<!-- endinject -->

	<!-- index:js -->
	<script src="/scripts/qq.js"></script>
	<!-- endinject -->
</body>
</html>
**/
gulp.task('inject', function () {
	gulp.src('src/*.html')
		.pipe($.inject(gulp.src(['dist/css/index.js', 'dist/css/index.css'], { read: true }), { name: 'index' }))
		.pipe($.inject(gulp.src(['src/**/aa.js', 'src/**/aa.css'], { read: false }), { name: 'common' }))
		.pipe(gulp.dest('dist'));
})

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

const wiredep = require('wiredep').stream;

gulp.task('bower', function () {
	gulp.src('./src/*.html')
		.pipe(wiredep({
			optional: 'configuration',
			goes: 'here'
		}))
		.pipe(gulp.dest('dist'));
});

// 合并文件
gulp.task('concat', function () {
	return gulp.src(['src/**/qq.css', 'src/**/commom.css'])
		.pipe($.if(/\.css$/, $.cssnano()))
		.pipe($.if(/\.js$/, $.uglify()))
		.pipe($.sourcemaps.init())
		.pipe($.concat('all.css', { newLine: '\n' }))
		.pipe($.sourcemaps.write('../sourcemaps'))
		.pipe(gulp.dest('dist/concatFolder'));
});

// js验证插件
gulp.task('lint', () => {
	return esLint('src/**/*.js')
		.pipe(gulp.dest('dist/scripts'));
});
gulp.task('eslint', ['lint'], function () {
	// This will only run if the lint task is successful...
	console.log('success');
});

// 压缩images
gulp.task('minifyimages', () =>
	gulp.src(config.source.image)
		.pipe($.imagemin())
		.pipe(gulp.dest(config.develop.image))
);

// 显示项目的大小
gulp.task('size', () =>
	gulp.src('dist/*')
		.pipe($.size())
		.pipe(gulp.dest('dist'))
);

// 获取bower 的main 文件  比如 css  js 字体文件什么的
const mainBowerFiles = require('main-bower-files');
gulp.task('mainbowerFiles', function () {
	return gulp.src(mainBowerFiles())
		.pipe($.if(/\.eot$|\.svg$|\.ttf$|\.woff$|\.woff2$/, gulp.dest(config.develop.font)))
		.pipe($.if(/\.js$/, gulp.dest(config.develop.js)))
		.pipe($.if(/\.css$/, gulp.dest(config.develop.css)))
	//.pipe(gulp.dest('dist/mainBowerFiles')) //随便丢在这个位置先，到时候可以删除
});

// 解析html中的 script 和 css, 对其进行引用
var useref = require('gulp-useref');
gulp.task('user', function () {
	return gulp.src('src/index.html')
		.pipe($.useref({ searchPath: ['dist/styles'] }))
		.pipe(gulp.dest('qq'));
});

// 删除文件
gulp.task('del', function () {
	del(config.rootBuild).then(paths => {
		$.util.log($.util.colors.red('Deleted folders'), $.util.colors.yellow(paths))
	});
})

// 删除文件的另一种写法
gulp.task('clean', del.bind(null, [config.rootBuild]));

//编译sass 自动补全css3属性
gulp.task('styles', function () {
	return gulp.src(config.source.scss)
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
		// css 压缩
		// .pipe($.cssnano())
		// .pipe($.sourcemaps.write('../sourcemaps'))
		.pipe(gulp.dest(config.develop.css));
});

// 编译babel js的相关处理
gulp.task('scripts', function () {
	return gulp.src(config.source.js)
		.pipe($.plumber())
		.pipe($.sourcemaps.init())
		.pipe($.babel({ presets: ['es2015'] }))
		// .pipe($.sourcemaps.write('../dist/sourcemaps'))
		.pipe(gulp.dest(config.develop.js))
});

//压缩文件
//api https://github.com/kangax/html-minifier
gulp.task('compress', ['styles', 'scripts', 'minifyimages'], function () {
	return gulp.src(config.source.html[0])
		.pipe($.if(/\.js$/, c))
		.pipe($.if(/\.css$/, $.cssnano()))
		.pipe($.if(/\.html$/, $.htmlmin({
			collapseWhitespace: true,
			minifyCSS: true,
			minifyJS: { compress: { drop_console: true } },
			processConditionalComments: true,
			removeComments: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true
		})))
		.pipe(gulp.dest(config.rootBuild))
		.pipe($.size({ title: 'build', gzip: true }));
});


const defaultTask = [
	'styles', 'scripts', 'minifyimages', 'mainbowerFiles', 'include'
]

// 浏览器同步配置
// 静态网站监听
gulp.task('default', defaultTask, function () {

	browserSync.init({
		notify: false,
		port: config.port,
		open: 'external', 	// 设置打开方式，默认为local
		// browser: ["chrome", "firefox"], // 可以设置多浏览器同时打开
		logPrefix: 'success', // 修改日志的文案
		ghostMode: false, // 禁用所有同步功能
		server: {
			baseDir: [config.rootBuild, config.rootDev], // 监控多个文件的时候，默认读取第一个子元素里面的index 文件
			routes: { '/dist': 'dist' }
		}
	});

	gulp.watch(config.source.js, ['scripts']).on('change', browserSync.reload);
	gulp.watch(config.source.image, ['minifyimages']).on('change', browserSync.reload);
	gulp.watch(config.source.scss, ['styles']).on('change', browserSync.reload);
	gulp.watch(config.source.html, ['include']).on('change', browserSync.reload);

});

// 动态网站监听配置
gulp.task('proxy', function () {
	console.log(config.rootDev)
	browserSync.init({
		proxy: 'http://localhost:55555'
	});
});

/**
* esLint js 校验
* @param files {string}	传入的文件，对当前文件进行相关操作
*/
function esLint(files) {
	return gulp.src(files)
		.pipe($.eslint({ fix: true }))
		.pipe(reload({ stream: true, once: true }))
		.pipe($.eslint.format())
		.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

var rev = require('gulp-rev-append');

gulp.task('rev', function() {
 gulp.src('./src/index.html')
   .pipe(rev())
   .pipe(gulp.dest('./build'));
});
