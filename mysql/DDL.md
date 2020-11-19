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

## 去重
没有去重之前
```
SELECT department_id FROM myemployees.employees;
```
<img src="./img/4.png">

使用关键字`distinct`去重
```
SELECT distinct department_id FROM myemployees.employees;
```
<img src="./img/5.png">

# 拼接
尝试一个结果
```
SELECT first_name, last_name from employees;
```
<img src="./img/6.png">

做`first_name`和`last_name`的拼接
尝试用`+`拼接
```
SELECT first_name + last_name from employees;
```
<img src="./img/7.png">

解析：
以前我们知道，select可以做为运算，在其他语言中，可以做为拼接字符串，但是在sql语言中，符号`+`只能作为运算符表达式，
1. 尝试将字符串转成数值
2. 如果成功，则为对应的数值，最后执行运算
3. 如果不成功，则变成数值0，最后执行运算
4. 如果运算符的其中一侧为`null`，最后的运算结构肯定为`null`;

总结：`+`号只能作为运算符，不能拼接

用`concat()`的方法拼接
```
SELECT CONCAT(first_name, "-", last_name) as add_opersion from employees;
```
<img src="./img/8.png">




