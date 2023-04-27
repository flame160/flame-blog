title: MySQL数据库操作
date: 2015-11-10 19:35:42
tags:
- 数据库
categories: 学习
---

数据库(Database)是按照数据结构来组织、存储和管理数据的仓库。在学习网站的过程中,遇到很多对数据库的相关操作,经过学习之后,在这里进行整理,列出对数据库的基本操作,本博客只是对应用较为常见的操作进行整理。
MySQL是一种开放源代码的关系型数据库管理系统（RDBMS）,MySQL数据库系统使用最常用的数据库管理语言--结构化查询语言（SQL）进行数据库管理。
<!--more-->

## mysql服务操作

* **启动或关闭mysql服务**

```{bash}
net start mysql//启动服务
net stop mysql //关闭服务
```
* **增加新用户**

```cpp
grant 权限 on 数据库.* to 用户名@登陆主机 identified by "密码"//基本格式
grant select,insert,update,delete on *.* to user1@localhost identified by "password1";//具体例子
//用户名为user1,密码为password1,让其在本机上登陆,并对所有的数据库有查询、插入、修改、删除的权限。
//首先以root用户连接mysql,然后键入该命令
```
* **进入数据库**

```cpp
mysql -u用户名 -p//Enter键后在输入密码
mysql -u用户名 -p密码//mysql -uroot -proot(用户名:root,密码:root)
mysql -h主机地址 -u用户名 -p密码//指定连接主机
```
* **退出mysql操作**

```cpp
quit/exit //更改密码
```

## mysql常用命令

|命令    | 说明 |
|:-------|:-----|
|SELECT VERSION();|显示当前服务器版本|
|SELECT NOW();|显示当前日期时间|
|SELECT USER();|显示当前用户|

## 数据库操作

|命令    | 说明 |
|:-------|:-----|
|show databases; |列出数据库|
|use database_name; |使用database_name数据库|
|create database think character set utf8 ;|创建数据库think(数据库名),设置编码为utf8|
|drop database think; |删除数据库think(数据库名)|
|grant all on wish.* to "hdw" @"localhost" identified by "hdw"; |只允许hdw用户操作数据库wish,密码是hdw|
|C://mysqldump -uroot -p houdunwang > d:/houdunwang.sql |将数据库houdunwang中的数据导出d:/houdunwang.sql(未通过mysql进入)|
|C://mysql -uroot -p houdunwang < d:/houdunwang.sql|将数据d:/houdunwang.sql导入数据库houdunwang(未通过mysql进入)|
|mysql>source d:/houdunwang.sql; |将数据d:/houdunwang.sql导入数据库houdunwang(已通过mysql进入)|

## 对数据库中表的操作

* **查看表属性**

```cpp
show tables  //查看表名
desc hd_wish //查看表hd_wish结构
```
* **创建表**

```cpp
create table hd_wish(id int unsigned not null primary key auto_increment, username varchar(20) not null default '',content
varchar(255) not null default '',time int(10) not null default 0) engine myisam charset utf8;
//创建表hd_wish（primary key 定义这个字段为主键,auto_increment 定义这个字段为自动增长,引擎为myisam,字符集为utf8）
create table new_tab_name like old_tab_name; //用一个已存在的表来建新表,但不包含旧表的数据
```
* **查看表中的数据**

```cpp
select *from hd_wish;  //查看表hd_wish中的所有数据
select *from hd_wish where id=1; //查看表hd_wish中的id=1的数据
select count(*) from hd_wish;  //统计表hd_wish中有多少条记录
select *from stu where sname like "李%";  //模糊匹配
select if(sex "男生","女生") as stusex,sname from stu;  //as取别名（stusex）
select concat("姓名:",sname,"性别:",sex,"QQ",qq) as stuinfo from stu;  //字符串与字段进行连接
select *from stu order by id desc limit 0,1; //从第零个开始取1个
select *from stu order by id desc limit 4; //取4条数据
select distinct year(birday) as "出生年份" from stu;  //distinct去掉重复的部分,year(birday)只得到年份
select user.value from user where user.uid in (select mete.uid from mete where mete.cid=1);
//从表user中查找数据user.value,其满足user.uid满足的条件为：mete表中mete。cid为1的mete.uid。
```
* **插入**

```cpp
insert into hd_user set username='admin',password=md5('admin'),logintime=unix_timestamp(now()); //向表hd_user中插入数据（非标准版）
insert into hd_user(username,password,logintime) values('admin',md5('admin'),unix_timestamp(now())); //向表hd_user中插入数据（标准版）
```
* **删除**

```cpp
drop table hd_wish;   //删除表hd_wish
delete from hd_wish;   //将表hd_wish中的记录清空
delect from hd_wish where username="admin";  //可用 WHERE 子句来选择所要删除的记录
delete table table_name column colmn_name;  //删除表中的一个字段
```
* **修改**

```cpp
alter table tab_name add PRIMARY KEY (col_name);  //更改表得的定义把col_num设为主键
alter table tab_name drop PRIMARY KEY (col_name);  //把主键的定义删除
update stu set birday="1990/2/23" where id=1;   //修改表stu中id=1的数据(将birday修改为"1990/2/23")
alter table tab_name rename to new_tab_name;   //修改表名
alter table tab_name change old_col new_col varchar(20); //修改字段名--必须为当前字段指定数据类型等属性,否则不能修改
```
* **增加**

```cpp
alter table stu add birday date;  //增加表stu字段birday
alter table stu add name varchar(20) not null default '';  //增加表stu字段name
```

## 其它

* **取消**

```cpp
\c   //取消所有命令   
Esc  //取消本行命令
```
* **外键**

```cpp
CREATE TABLE provinces (
  id SMALLINT(5) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  pname VARCHAR(20) NOT NULL
)ENGINE MYISAM DEFAULT CHARSET utf8;

CREATE TABLE users (
  id SMALLINT(5) UNDSIGNED PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  pid SMALLINT(5) UNSIGNED,
  FOREIGN KEY (pid) REFERENCES provinces (id)
)ENGINE MYISAM DEFAULT CHARSET utf8;;
```


参考：
[MySQL数据库基本操作命令](http://blog.sina.com.cn/s/blog_74d4eb690100r80t.html)

