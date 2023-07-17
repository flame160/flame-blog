#!/usr/bin/env sh
# 忽略错误
set -e

# 构建
npm run docs:build

# 进入待发布的目录
cd docs/.vitepress/dist

git init
git add -A
git commit -m 'add'

# git push -f git@github.com:你的git名/你的git项目名.git master:你的git分支
git push -f git@github.com:flame160/flame-bog.git master

cd -