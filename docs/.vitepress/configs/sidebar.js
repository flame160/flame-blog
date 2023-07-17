export default {
  '/platform/': getPlatformSidebar(),    //平台介绍
  '/guide/': getGuideSidebar()  //指南
}

function getPlatformSidebar() {
  return [
    {
      text: '商终密平台',
      collapsed: false,
      items: [
        {
          text: '259号文改造',
          link: '/platform/szm/number259'
        },
        {
          text: '8583老版本项目问题',
          link: '/platform/szm/old8583'
        },
        {
          text: '短连接改长连接',
          link: '/platform/szm/long-connection'
        },
        {
          text: '多渠道号项目获取渠道号逻辑',
          link: '/platform/szm/multiple-chnid'
        },
      ]
    },
    {
      text: '新一代',
      collapsed: false,
      items: [
        {
          text: '新一代开发常见问题',
          link: '/platform/xyd/common-problem'
        },
        {
          text: '新一代mac计算',
          link: '/platform/xyd/mac'
        },
      ]
    },
    {
      text: '增值服务平台',
      collapsed: false,
      items: [
        {
          text: '平台介绍',
          link: '/platform/avsc/introduction'
        },
        {
          text: '增值服务常见问题',
          link: '/platform/avsc/common-problem'
        },
      ]
    }
  ]
}

//  指南:docsify、vuepress、vite安装介绍
function getGuideSidebar() {
  return [
    {
      text: '指南',
      items: [
        {
          text: '介绍',
          link: '/guide/'
        }
      ]
    },
    {
      text: '安装',
      //collapsible: false,
      collapsed: false, //所有分组默认都是展开状态的。如果你想让它们在初始页面加载时是关闭收缩状态，请将collapsible选项设置为true。
      items: [
        {
          text: 'docsify安装',
          link: '/guide/docsify'
        },
        {
          text: 'vuepress安装',
          link: '/guide/vuepress'
        },
        {
          text: 'vitepress安装',
          link: '/guide/vitepress'
        }
      ]
    }
  ]
}

