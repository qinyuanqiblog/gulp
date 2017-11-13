
#gulp 构站配置
> 采用了bower + gulp 进行自动构站，并配置了一套自己的开发模式

## gulp 目录介绍

```js
/** 关于目录的介绍

gulp
|-- build				生产环境使用的目录
|	|-- fonts			存放网页字体
|	|-- images  		存放压缩后的图片
|	|-- js 				存放bebal编译过后的js文件目录
|	|-- css  			存放sass编译后的css文件目录
|-- src 				存放源代码
|	|-- fonts			存放字体相关的
|	|-- images			存放图片的
|	|-- js 				存放js源码
|	|-- scss  			存放sass源码
|-- dist 				打包发布的代码
|	|-- fonts			存放字体相关的
|	|-- images			存放图片的
|	|-- js 				存放js源码
|	|-- css  			存放sass源码
|-- gulp 				gulp配置文件
|	|-- tasks			所有的task配置
|	|-- config.js       配置文件
|-- bower_components 	存放bower引入的项目    			根据bower.json生成
|-- node_modules	  	存放各种nodejs相关插件的地方		 根据package.json文件生成
|-- bowre.json 			bower配置文件
|-- gulpfile.js 		gulp配置文件
|-- package.json 	    npm配置文件

**/
```
