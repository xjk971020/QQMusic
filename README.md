# QQ音乐网页版(纯前端开发)

## 写在前面

基于QQ音乐程序UI的网页版QQ音乐，项目基于前端框架[vue](https://github.com/vuejs/vue#readme)进行开发，[vue-router](https://github.com/vuejs/vue-router#readme)页面跳转，vuex全局存储播放的音乐信息，某些样式基于饿了么团队的[element ui](https://element.eleme.cn/#/zh-CN)组件。个人刚学完基于vue框架，vue-router，vuex的基础，以及css中布局基础以及某些常用的样式基础，基于以上知识，便仿照QQ音乐程序的UI做出了网页版QQ音乐。

鉴于本人前端刚刚入门，本项目仅为刚学完vue基础和有css布局基础的同学提供参考，某些代码开发的还有不够规范之处，大神请用看笑话的心态看待，或提出批判性意见，本人虚心受教。

如果想看项目截图的可以直接拉到最下面。

**(注意：目前本项目不支持移动端，在手机上浏览布局非常乱，还请用电脑访问)**

## 接口

感谢[大神](https://github.com/rain120/qq-music-api)提供接口, 由于该接口项目中有部分接口数据需求不足，故还用jsonp跨域请求部分歌手详情页面的数据, jsonp接口数据来源[另一个项目](https://github.com/BiggerHacker/nature-music)，本项目的进度条播放功能借鉴于该项目，在此鸣谢。

## 部署

由于项目用到开源项目的qq音乐的接口，所以需要先克隆该[开源项目](https://github.com/rain120/qq-music-api)到本地运行，再部署本项目才能获取数据。

本项目部署:

`git clone git@github.com:xjk971020/QQMusic.git`

进入项目根目录下安装依赖:

`npm install`

运行项目:

`npm run dev`

## 技术选型

- vue 2.6.11
- vue-router 3.1.2
- vuex 3.1.2
- element-ui 2.13.0
- 歌词解析: lyric-parser 1.0.1
- xml解析: x2js 3.4.0
- 请求进度条: nprogress 0.2.0
- jsonp 0.2.1

## 开发环境

- 语言: javascript, html5, scss
- IDE: WebStorm 2019.3.1
- 打包工具: webpack
- 包管理工具: npm

## 目录结构

└─src
    │  App.vue          项目入口
    │  main-dev.js     开发环境配置
    │  main-prod.js   生产环境配置
    │  
    ├─api                 接口文件
    ├─assets           静态资源
    │          
    ├─class              使用的类文件
    │      
    ├─components   组件
    │      
    ├─plugins
    │      element.js  element-ui组件
    │      
    ├─router             路由文件
    ├─store               vuex共享
    ├─util                  工具类
    └─views              视图

## 优化

1、为防止项目依赖包过多，通过vue.config.js文件用externals属性移除vue，vue-router，axios，element-ui等依赖，并通过cdn的方式访问。

2、通过`babel-plugin-transform-remove-console`插件在项目打包时移除所有的console代码。

3、在axios请求中通过nprogress展示网络请求的进度条。

## 结果

### 精选部分

![](http://cdn.cathetine.cn/image/qqmusic/1.jpg)

### 排行部分

![](http://cdn.cathetine.cn/image/qqmusic/2.jpg)

![](http://cdn.cathetine.cn/image/qqmusic/3.jpg)

### 歌单部分

![](http://cdn.cathetine.cn/image/qqmusic/4.jpg)

![](http://cdn.cathetine.cn/image/qqmusic/5.jpg)

![](http://cdn.cathetine.cn/image/qqmusic/6.jpg)

### 歌手部分

![](http://cdn.cathetine.cn/image/qqmusic/7.jpg)

![](http://cdn.cathetine.cn/image/qqmusic/8.jpg)

### 播放历史

![](http://cdn.cathetine.cn/image/qqmusic/9.jpg)

### 我的收藏

![](http://cdn.cathetine.cn/image/qqmusic/10.jpg)

### 搜索结果

![](http://cdn.cathetine.cn/image/qqmusic/11.jpg)