# docsify安装

## 使用前提
安装docsify-cli之前，我们需要安装npm包管理器，而安装了node.js就会自动安装npm。官网地址：[Node.js](https://nodejs.org/en/)。
```yaml
node -v  #验证node
npm -v   #验证npm
```
## 如何搭建
[使用指南](https://ysgstudyhards.github.io/Docsify-Guide/#/ProjectDocs/Docsify%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97)、[使用说明](https://blog.csdn.net/liyou123456789/article/details/124504727)

**1. 推荐全局安装 docsify-cli 工具**，可以方便地创建及在本地预览生成的文档。
```shell
npm i docsify-cli -g   #用npm安装全局工具
```

**2. 项目初始化**

如果想在项目的 ./docs(文件名可以按自己的想法来，本次文件名设置为flameBlog) 目录里写文档，直接通过 init 初始化项目。
```shell
docsify init ./flameBlog

#初始化成功之后可以看到flameBlog目录下创建的几个文件
index.html 入口文件
README.md 会做为主页内容渲染
.nojekyll 用于阻止 GitHub Pages 忽略掉下划线开头的文件
```
直接编辑 docs/README.md 就能更新文档内容，当然也可以[添加更多页面](https://docsify.js.org/#/zh-cn/more-pages)。

**3. 本地运行docsify项目**

通过运行 docsify serve 项目名称  启动一个本地服务器，可以方便地实时预览效果。默认访问地址 [http://localhost:3000](http://localhost:3000/) 。
```shell
docsify serve flameBlog
```
## 基础配置文件介绍
| **文件作用** | **文件** |
|:-------|:-----|
| 基础配置项（入口文件） | index.html |
| 封面配置文件 | _coverpage.md |
| 侧边栏配置文件 | _sidebar.md |
| 导航栏配置文件 | _navbar.md |
| 主页内容渲染文件 | README.md |
| 浏览器图标 | favicon.ico |

在导航文件直接使用，表情可参考网站[https://www.emojiall.com/zh-hans](https://www.emojiall.com/zh-hans)
## 部署和示例
[部署到github](https://cloud.tencent.com/developer/article/1943653)，访问：[https://flame160.github.io/flame-blog/](https://flame160.github.io/flame-blog/)

示例：
- [凯默叔叔的小屋](https://kaimo313.github.io/uncle-kaimo-cabin/#/)：[https://github.com/kaimo313/uncle-kaimo-cabin/](https://github.com/kaimo313/uncle-kaimo-cabin/)
- [Node.js技术栈](https://www.nodejs.red/#/)：[https://github.com/qufei1993/Nodejs-Roadmap](https://github.com/qufei1993/Nodejs-Roadmap)
- [javaguide](https://snailclimb.gitee.io/javaguide/#/)：[https://github.com/Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide)
- [dnd5ewiki](https://dnd5ewiki.rulatedaydice.ga/#/)：[https://github.com/Eiriksgata/rulateday-dnd5e-wiki/tree/master](https://github.com/Eiriksgata/rulateday-dnd5e-wiki/tree/master)
