import { defineConfig } from 'vitepress'
import nav from './configs/nav'   //导航
import sidebar from './configs/sidebar'  //侧边栏
import mdItCustomAttrs  from 'markdown-it-custom-attrs'  //vitepress添加图片放大预览效果

export default defineConfig({
  title: "My Blog",
  ignoreDeadLinks: true, //https://vitepress.dev/reference/site-config#ignoredeadlinks
  base: "/flame-blog/",
  description: "dubo blog",
  markdown: {
	lineNumbers: true,  //代码行号
    config: (md) => {
      // use more markdown-it plugins!
      md.use(mdItCustomAttrs, 'image', {
        'data-fancybox': "gallery"
      })
    }
  },
  head: [ // 注入到页面<head> 中的标签，格式[tagName, { attrName: attrValue }, innerHTML?]
    ['link', { rel: 'icon', href: '/ico/favicon.ico' }], //favicons，资源放在public文件夹
    ['meta', { name: 'keywords', content: 'vitepress,theme,blog' }],
    ["link", { rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css" }], //图片放大
    ["script", { src: "https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js" }]
  ],
  // light: #f9fafb, dark: --vp-code-block-bg
  theme: { light: 'github-light', dark: 'github-dark' },
  themeConfig: {
	logo: "/img/logo.png", //如果你的网站有一个 LOGO，你可以通过传入图片的路径来显示它。你应该把 LOGO 直接放在public目录中，并定义它的绝对路径。
    //siteTitle: 'My Custom Title', //默认情况下，导航是根据config.title的值显示网站的标题。如果你想改变导航上显示的内容，你可以在themeConfig.siteTitle选项中定义自定义文本。
	outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    outline: [2, 3], //number | [number, number] | 'deep' | false 默认为2

    // nav: [
    //   { text: '首页', link: '/' },
    //   { text: '示例', link: '/markdown-examples' }
    // ],
    nav: nav,  //导航栏
    sidebar: sidebar, //侧边栏
    // 搜索
    // algolia: {
    //     appId: 'X51HWTCQJJ',
    //     apiKey: 'ca20f15eb8a667898b65d13f4213ae3d',
    //     indexName: 'vitepress-blog'
    // },
    //本地搜索
    search: {
      provider: 'local'
    },

	editLink: {
      pattern: 'https://github.com/flame160/vitepress-blog/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      // You can also add custom icons by passing SVG as string:
      //{
        //icon: {
          //svg: '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"><circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />'
        //},
        //link: 'https://music.163.com/#/playlist?id=755597173'
      //},

    ],
	footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present dubo'
    }
  }
})
