var rootSrc = './src';
var rootBuild = './build';
var rootDist = './dist';
var CONFIG = {};

// 生产环境中使用到的task

CONFIG.rootSrc = rootSrc;
CONFIG.rootBuild = rootBuild;
CONFIG.build = {
    font: {
        taskName: 'fonts',
        watchScope: [rootSrc + '/fonts/**/**/*'],
        exportPath: rootBuild + '/fonts'
    },
    img: {
        taskName: 'img',
        watchScope: [rootSrc + '/img/**/**/*'],
        exportPath: rootBuild + '/img'
    },
    sass: {
        taskName: 'sass',
        watchScope: [rootSrc + '/sass/index.scss'],
        exportPath: rootBuild + '/css'
    },
    html: {
        taskName: 'includeHtml',
        watchScope: [rootSrc + '/**/*.html'],
        exportPath: rootBuild
    },
    babel: {
        taskName: 'babel',
        watchScope: [rootSrc + '/js/*'],
        exportPath: rootBuild + '/js'
    },
    mainBowerFiles: {
        taskName: 'mainBower',
        fontExportPath: rootBuild + '/font',
        cssExportPath: rootBuild + '/css',
        jsExportPath: rootBuild + '/js_lib',
    },
    // bower: {
    //     taskName: 'bower',
    //     watchScope: [rootSrc + '/*.html'],
    //     exportPath: rootBuild
    // },
};

// 工具类task
CONFIG.tool = {
    bowerSync: {
        taskName: 'browserSync',
        port: 55555
    },
    del: {
        taskName: 'del',
        watchScope: [rootBuild, rootDist],
    },
    clean: {
        taskName: 'clean',
        watchScope: rootBuild,
    },
    compressHtmlOptions: {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: false //压缩页面CSS 这个要设为false  否则  页面页面上的 style="{{}}"  的形式会被干掉
    }

};

//发布的时候使用到的task
CONFIG.dist = {
    css: {
        taskName: 'dist.css',
        watchScope: [rootBuild + '/css/**/*.css'],
        exportPath: rootDist + '/css/'
    },
    html: {
        taskName: 'dist.html',
        watchScope: [rootBuild + '/**/*.html'],
        exportPath: rootDist
    },
    js: {
        taskName: 'dist.js',
        watchScope: [rootBuild + '/js/**/*.js'],
        exportPath: rootDist + '/js'
    },
}

module.exports = CONFIG;
