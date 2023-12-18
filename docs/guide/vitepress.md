# VitePress搭建
[VitePress使用示例](https://zhuanlan.zhihu.com/p/402505562)
## 使用前提
Vite 需要 [Node.js](https://nodejs.org/en/) 版本 14.18+，16+。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。
## 如何搭建

**1. 新建文件vitepress-starter**

**2. 使用你喜欢的包管理器进行初始化,将会创建一个package.json文件**
```bash
yarn init # npm init
yarn init -y # npm init -y (-y免去确认)
```
**3. 将 VitePress 安装为本地依赖**（已经不再推荐全局安装 VuePress：**npm install -g vitpress**）
```shell
yarn add -D vitepress # npm install --dev vitepress   --dev和-D作用相同，也可以使用pnpm
yarn add -D vitepress vue # 安装 VitePress 和 Vue 作为项目的开发依赖
```
> 没有yarn命令可以[使用npm安装yarn](https://blog.csdn.net/weixin_40808668/article/details/122606543)：

```shell
npm install -g yarn  #安装
yarn --version  #查看版本
```
> 没有pnpm命令可以[使用npm安装pnpm](https://blog.csdn.net/weixin_40808668/article/details/127248755)：

```bash
npm install -g pnpm  #安装
pnpm config set registry https://registry.npm.taobao.org/ #设置镜像源
pnpm config get registry  # 检查

pnpm add nodemon -g #等价于npm i nodemon -g
```

**4. 创建文档docs/index.md，配置package.json**
```bash
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```
::: tip
启动脚本docs:dev 键值可以自定义修改，此处是为了和一些项目中默认脚本中自带的 dev 区分开，都是等效于执行vitepress dev doc，根据docs下的所有.md/.html文件做一个项目的编译和打包。
:::

**5. 本地启动服务器**

VitPress 会在[ http://localhost:5173]()启动一个热重载的开发服务器。
```bash
yarn docs:dev # npm run docs:dev  启动你的VitePress
yarn docs:build # 或者：npm run docs:build  构建
```

**6. 使用npx vitepress init初始化**
```bash
npx vitepress init # 或者使用 pnpm。  pnpm exec vitepress init
```

<!-- ![](图片地址) -->
<!-- ![npx init说明](/img/guide/vitepress_npx_init.png) -->
<img src="/img/guide/vitepress_npx_init.png" data-fancybox="gallery"/>
虽然 vitePress 是热重载的，但是，「**所有对于 .vitepress/config.js 的修改，都要项目重新启动才会生效**」。

## 基础配置文件介绍
VitePress 配置的配置文件.vitepress/config.js，VitePress的配置都在这个文件中设置。
```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js
│  └─ index.md
└─ package.json
```
首页配置：
```bash
---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "我的测试项目"
  # text: "测试"
  tagline: my blog
  actions:
    - theme: brand
      text: 了解更多
      link: /markdown-examples
    - theme: alt
      text: API Examples
      link: /api-examples

features:
  - title: Feature A
    icon: 🚀
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature B
    icon: 🔨
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
  - title: Feature C
    icon: 🌈
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit
---
```
## 部署和示例
示例：<br />[vitepress-demo](https://xinlei3166.github.io/vitepress-demo/)：[https://github.com/xinlei3166/vitepress-demo](https://github.com/xinlei3166/vitepress-demo)

## 问题
1. "vitepress" resolved to an ESM file. ESM file cannot be loaded by "require". See https://vitejs.dev/guide/troubleshooting.html#this-package-is-esm-only for more details. [plugin externalize-deps]

解决方法：config.js改名为config.mjs
- adding "type": "module" to the nearest package.json
- renaming vite.config.js/vite.config.ts to vite.config.mjs/vite.config.mts
