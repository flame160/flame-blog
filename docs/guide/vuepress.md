# VuePress搭建
[VuePress使用示例](https://blog.csdn.net/xiaoxianer321/article/details/119548202)

## 使用前提
VuePress 需要 [Node.js](https://nodejs.org/en/)>= 8.6

## 如何搭建
**1. 新建文件vuepress-starter**

**2. 使用你喜欢的包管理器进行初始化,将会创建一个package.json文件**
```bash
yarn init # npm init
yarn init -y # npm init -y (-y免去确认)
```
**3. 将 VuePress 安装为本地依赖**（已经不再推荐全局安装 VuePress：**npm install -g vuepress**）
```shell
yarn add -D vuepress # npm install -D vuepress
```
::: warning
如果你的现有项目依赖了 webpack 3.x，我们推荐使用 [Yarn](https://classic.yarnpkg.com/zh-Hans/)而不是 npm 来安装 VuePress。因为在这种情形下，npm 会生成错误的依赖树。
:::

[使用npm安装yarn安装](https://blog.csdn.net/weixin_40808668/article/details/122606543)：
```shell
npm install -g yarn  #安装
yarn --version  #查看版本
```

**4. 创建文档docs/README.md，配置package.json**
```bash
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```
::: tip
启动脚本docs:dev 键值可以自定义修改，此处是为了和一些项目中默认脚本中自带的 dev 区分开，都是等效于执行vuepress dev doc，根据你目录中的.vuepress配置项和docs下的所有.md/.html文件做一个项目的编译和打包。
:::

**5. 本地启动服务器**

VuePress 会在 [http://localhost:8080](http://localhost:8080/)启动一个热重载的开发服务器。build生成静态的HTML文件,默认会在 .vuepress/dist 文件夹下
```bash
yarn docs:dev # npm run docs:dev  启动你的VuePress
yarn docs:build # 或者：npm run docs:build  构建
```
## 基础配置文件介绍
[VuePress 遵循 “**约定优于配置**” 的原则，推荐的目录结构如下](https://blog.csdn.net/xiaoxianer321/article/details/119548202)<br/>
[windows创建以 '.' 开头的文件提示必须键入名称的解决办法](https://help.aliyun.com/document_detail/152622.html)：mkdir .vuepress
```bash
.
├── docs
│   ├── .vuepress (可选的,用于存放全局的配置、组件、静态资源等。)
│   │   ├── components (可选的,该目录中的 Vue 组件将会被自动注册为全局组件)
│   │   ├── theme (可选的,用于存放本地主题)
│   │   │   └── Layout.vue
│   │   ├── public (可选的,静态资源目录)
│   │   ├── styles (可选的,用于存放样式相关的文件)
│   │   │   ├── index.styl
│   │   │   └── palette.styl
│   │   ├── templates (可选的, 谨慎配置,存储 HTML 模板文件)
│   │   │   ├── dev.html
│   │   │   └── ssr.html
│   │   ├── config.js (可选的,配置文件的入口文件，也可以是 YML 或 toml)
│   │   └── enhanceApp.js (可选的,客户端应用的增强)
│   │ 
│   ├── README.md
│   ├── guide (一般用户都在这个目录下创建网站指南,当然可以不用)
│   │   └── README.md （指南里面的具体内容）
│   └── config.md
│ 
└── package.json 项目初始化时，根目录下自动生成的配置文件,定义了项目的基本配置信息及需要依赖的各个模块、指定运行脚本命令的npm命令行缩写等。
```

- **docs/.vuepress/styles/index.styl:** 将会被自动应用的全局样式文件，会生成在最终的 CSS 文件结尾，具有比默认样式更高的优先级。
- **docs/.vuepress/styles/palette.styl**: 用于重写默认颜色常量，或者设置新的 stylus 颜色常量。
- **docs/.vuepress/templates/dev.html**: 用于开发环境的 HTML 模板文件。
- **docs/.vuepress/templates/ssr.html**: 构建时基于 Vue SSR 的 HTML 模板文件。

默认的主题提供了一个[首页（Homepage）](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5)的布局。想要使用它，需要在你的根级 README.md 的 [YAML front matter](https://vuepress.vuejs.org/zh/guide/markdown.html#front-matter) 指定 home: true。以下是一个如何使用的例子：
```yaml
---
home: true
heroImage: /hero.png
heroText: Hero 标题
tagline: Hero 副标题
actionText: 快速上手 →
actionLink: /zh/guide/
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```
## 部署和示例
示例：

- itclanCode：[https://github.com/itclanCode/vuepress-build-blog-demo](https://github.com/itclanCode/vuepress-build-blog-demo)和[https://github.com/itclanCode/blogcode](https://github.com/itclanCode/blogcode)
- [vuepress-theme-vdoing一款简洁高效的VuePress知识管理&博客(blog)主题](https://doc.xugaoyi.com/)：[https://github.com/xugaoyi](https://github.com/xugaoyi)
- VuePress Theme Hope: [https://theme-hope.vuejs.press/zh/](https://theme-hope.vuejs.press/zh/)
- [Vue中文文档](https://www.baidu.com/link?url=KOCAZ4mJBQA_JSDhEsdIerTot32d5yT6R75BIo69h_fZU0THLs3sMfMB3Y_KSDECZjTgcahf_arfUsYNNdl-EK&wd=&eqid=c19117450002c1e50000000664537a41)：[https://github.com/vuejs/docs-next-zh-cn/tree/master](https://github.com/vuejs/docs-next-zh-cn/tree/master)
- [vuepress-theme-reco](https://vuepress-theme-reco.recoluan.com/)：[https://github.com/vuepress-reco/vuepress-theme-reco/tree/main](https://github.com/vuepress-reco/vuepress-theme-reco/tree/main)
- [vuepress-next](https://v2.vuepress.vuejs.org/zh/)：[https://github.com/vuepress/vuepress-next](https://github.com/vuepress/vuepress-next)
