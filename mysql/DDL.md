# 基础查询
语法：
select 字段名 from 表格名

特点：
1. 查询列表可以是，表中的字段，常量值，表达式，函数
2. 查询的结果是一个虚拟的表格

* 查询表格的单个字段
```
select first_name from myemployees;
```
* 查询多个字段
```
select first_name, last_name from myemployees;
```

* 查询所有的字段
```
select * from myemployees
```
弊端：安装表格的顺序查出来，并不能定制查询的字段顺序

# 查询常量
查询100
```
select 100;
```
查询字符串uncle
```
select 'uncle';
```
# 查询表达式
```
select 10 * 10;
```
查询到的是表达式的结果，可以加减乘除取余
# 查询函数
查看版本
```
select version;
```
查看当前在用的数据库
```
select database;
```

# 起别名
优点：
1. 便于理解
2. 如果要查询的字段有重名的情况，可以用别名分开
* 方式一：
```
SELECT 1 + 1 as 加法;
```
<img src="./img/1.png">

* 方式二
```
SELECT 1 + 1 as 加法;
```
<img src="./img/2.png">

* 方式三 
对于有空格分开的单词，要用双引号引起来
```
SELECT manger_id "good good" from departments;
```
<img src="./img/3.png">

