title: 码云和Github
date: 2017-01-07 15:28:07
tags:
- git
categories: 工具
---
Git是一个开源的分布式版本控制系统,可以有效、高速的处理从很小到非常大的项目版本管理。
码云和Github都是代码托管平台,码云是开源中国社区2013年推出的基于 Git 的完全免费的代码托管服务,这个服务是基于 Gitlab 开源软件所开发的。码云相对于Github服务器在国内,速度更快,但是有时不稳定。码云的免费账户可以建立私有项目,Github的私有项目需要付费。
<!--more-->

## 1.码云

* **Clone**
```{bash}
git clone http://git.oschina.net/xxxx/xxxx.git
```
例如:
```cpp
git clone http://git.oschina.net/flame160/Test.git
flame160为oschina的用户名
Test新建的项目名
```

* **写代码,提交变更**
```cpp
git status 查看工作区代码相对于暂存区的差别
git add .  将当前目录下修改的所有代码从工作区添加到暂存区,“.”代表当前目录
git commit -m "注释"
```
或者将上面两句合并成一句
```cpp
git commit -am "注释"
```
* **修改注释**
```cpp
git commit --amend  //进行文本进行注释修改然后保存文本
git commit --amend -m "新的注释"
git push -f
```

* **push**
```cpp
git push 或者 git push origin $name (git push origin $Test)
git push origin master 将本地版本库推送到远程服务器
origin是远程主机,master表示是远程服务器上的master分支,分支名是可以修改的
```

* **git版本恢复命令**
```cpp
git reset --mixed： //此为默认方式,不带任何参数的git reset,即时这种方式,它回退到某个版本,只保留源码,回退commit和index信息
git reset --soft： //回退到某个版本,只回退了commit的信息,不会恢复到index file一级。如果还要提交,直接commit即可
git reset --hard： //彻底回退到某个版本,本地的源码也会变为上一个版本的内容
```
例如：
```cpp
git rest --hard HEAD^  //回退所有内容到上一个版本  
git reset --soft HEAD~3  //回退到第3个版本  
git reset 78eb6959c  //回退到某个版本（commits 78eb6959c ） 
```
用git reset --hard HEAD^^ 回退到前两版本后,再在此版本上更新后,想push,但出错,提示说remote端的版本比我本地版本要高。

解决办法：
这种“回退”就是在否认历史,如果有其他人也在用你的remote,你push以后将他置于何地呢？
所以,如果仅仅你自己在使用,那么强制push,命令是git push -f 如果是与人合作,更漂亮的做法是revert。
git revert 是生成一个新的提交来撤销某次提交,此次提交之前的commit都会被保留
git reset 是回到某次提交,提交及之前的commit都会被保留,但是此次之后的修改都会被退回到暂存区

git revert 撤销 某次操作,此次操作之前和之后的commit和history都会保留,并且把这次撤销
作为一次最新的提交
```cpp
git revert HEAD^               //撤销前前一次 commit
git revert commit  //（比如：fa042ce57ebbe5bb9c8db709f719cec2c58ee7ff）撤销指定的版本,撤销也会作为一次提交进行保存。
git revert是提交一个新的版本,将需要revert的版本的内容再反向修改回去,版本会递增,不影响之前提交的内容。
```

* **git其它常用命令**

|命令  |说明  |
|:-------|:------- |
|git branch | 查看本地所有分支|
|git status | 查看当前状态 |
|git log    | 查看提交历史|
|git show   | 显示某次提交的内容|

Git@可以结合[Team@OSC](https://team.oschina.net/)来更好的进行团队开发,实现开发团队的代码变动状态,任务管理,在线多人编写技术文档,讨论分享等。


## 2.Github

码云是仿照Github的,因此两者的使用非常类似。其具体安装配置及相关功能使用参考博客[[1]](http://blog.csdn.net/llf369477769/article/details/51917557)和[[2]](http://blog.csdn.net/brucexiajun/article/details/52055734)。

* **Clone**
```cpp
git clone git@github.com:xxx/xxx.git
git clone git@github.com:flame60/MyTest.git  
```
写代码、提交变更、注释与码云相同,版本回退也相同,除此之外,还可以打开[Github For Windows](http://blog.csdn.net/chinahaerbin/article/details/17716023)进入到需要回退的项目主页,在History里选中要回退的某个版本,点击右侧的“roll back”按钮,这时在下方就会提示一个“UNDO”的撤销操作,代表你已经成功回退到某个版本了。

* **push**
```cpp
git push -u origin master
```

参考：
[Git 常用命令速查表(图文+表格)](http://www.jb51.net/article/55442.htm)
[git如何修改注释](http://blog.csdn.net/chenshuyang716/article/details/52836461)
[Git版本恢复命令reset](http://blog.csdn.net/xsckernel/article/details/9021225)
[git 回退到某版本后,再在此版本上更新,无法push](http://blog.csdn.net/yu870646595/article/details/51443279)