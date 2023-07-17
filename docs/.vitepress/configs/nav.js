export default [
  { text: '首页', link: '/' },
  { text: '指南', link: '/guide/', activeMatch: '^/guide/' },
  {
    text: '平台介绍',
    items: [
      { text: '商终密平台', link: '/platform/szm/number259',  activeMatch: '^/szm/' },
      { text: '新一代', link: '/platform/xyd/common-problem',  activeMatch: '^/xyd/'  },
      { text: '增值服务平台', link: '/platform/avsc/introduction',  activeMatch: '^/avsc/'  }
    ]
  },
  {
    text: '博客',
    items: [
      { text: '酷 壳 – CoolShell', link: 'https://coolshell.cn/' },
      { text: '廖雪峰的官方网站', link: 'https://www.liaoxuefeng.com/' },
    ]
  },
  {
    text: '学习资源',
    items: [
      { text: 'java guide', link: 'https://snailclimb.gitee.io/javaguide/#/' },
      { text: 'element ui', link: 'https://element.eleme.cn/#/zh-CN' },
    ]
  },
]

