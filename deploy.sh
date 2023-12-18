#!/usr/bin/env sh

#部署到github pages
#https://cloud.tencent.com/developer/article/2115149?from=15425

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件 npm或pnpm run docs:build
yarn docs:build

# 进入生成的文件夹
cd docs/.vitepress/dist

# git add -A选项告诉Git将所有文件添加到索引 只想添加新创建和修改的文件（不包括已删除的文件），可以使用git add .命令。
# git commit -m注释
git init
git add -A
git commit -m 'deploy'

# git push -f git@github.com:你的git名/你的git项目名.git master:分支名称（ssh）
# https到main分支（gitHubPages）
git push -f  https://github.com/flame160/flame-blog.git master:main #master:main 表示将本地的 master 分支推送到远程的 main 分支

cd -
