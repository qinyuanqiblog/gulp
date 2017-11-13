var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var gulpTaskList = require('fs').readdirSync('./gulp/tasks/');
var config = require('./gulp/config.js');

var buildTask = [];
var publishTask = [];

buildTask = getTaskArr(config.build, buildTask)
publishTask = getTaskArr(config.dist, publishTask)

gulpTaskList.forEach(function(taskfile) {
    require('./gulp/tasks/' + taskfile)(gulp, gulpLoadPlugins, config);
});

/**
 *处理task对象
 *
 * @param  {obj} taskObj  	  未经处理的task对象
 * @return {obj} taskNameObj  经过处理的taskName数组
 */
function getTaskArr(taskObj, taskNameObj) {
    for (var name in taskObj) {
        if (taskObj[name].taskName) {
            taskNameObj.push(taskObj[name].taskName);
        }
    }
    return taskNameObj;
}


// 生产环境使用的
gulp.task('build', buildTask);

// 默认使用的
gulp.task('default', function() {
    runSequence('build', config.tool.bowerSync.taskName);
})

// 发布的时候使用的
gulp.task('publish', function() {
    runSequence('build', publishTask);
})
