# 基础查询
语法：
select 字段名 from 表格名

特点：
1. 查询列表可以是，表中的字段，常量值，表达式，函数
2. 查询的结果是一个虚拟的表格

* 查询表格的单个字段
```sql
select first_name from myemployees;
```
* 查询多个字段
```sql
select first_name, last_name from myemployees;
```

* 查询所有的字段
```sql
select * from myemployees
```
弊端：安装表格的顺序查出来，并不能定制查询的字段顺序

# 查询常量
查询100
```sql
select 100;
```
查询字符串uncle
```sql
select 'uncle';
```
# 查询表达式
```sql
select 10 * 10;
```
查询到的是表达式的结果，可以加减乘除取余
# 查询函数
查看版本
```sql
select version;
```
查看当前在用的数据库
```sql
select database;
```

# 起别名
优点：
1. 便于理解
2. 如果要查询的字段有重名的情况，可以用别名分开
* 方式一：
```sql
SELECT 1 + 1 as 加法;
```
<img src="./img/1.png">

* 方式二
```sql
SELECT 1 + 1  加法;
```
<img src="./img/2.png">

* 方式三 
对于有空格分开的单词，要用双引号引起来
```sql
SELECT manger_id "good good" from departments;
```
<img src="./img/3.png">

## 去重
没有去重之前
```sql
SELECT department_id FROM myemployees.employees;
```
<img src="./img/4.png">

使用关键字`distinct`去重
```sql
SELECT distinct department_id FROM myemployees.employees;
```
<img src="./img/5.png">

# 拼接
尝试一个结果
```sql
SELECT first_name, last_name from employees;
```
<img src="./img/6.png">

做`first_name`和`last_name`的拼接
尝试用`+`拼接
```sql
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
```sql
SELECT CONCAT(first_name, "-", last_name) as add_opersion from employees;
```
<img src="./img/8.png">

## IFNULL函数的使用
需求场景：
将first_name, last_name, job_id, commission_pct 拼接在一起，
并且取一个名字叫做'haode',还要用`-`隔开
正常逻辑代码：
```sql
SELECT CONCAT(first_name, '-', last_name, '-', job_id, '-', commission_pct) FROM employees;
```
<img src="./img/9.png">

原因分析：
`CONCAT`函数要合并的字段里面，有其中一个表格的字段为`null`，合并之后，最终的值是`null`

----

`IFNULL()`函数
```sql
select isnull(commission_pct, '?'), commission_pct from employees;
```
<img src="./img/10.png">

重新构造查询：
```sql
SELECT CONCAT(first_name, '-', last_name, '-', job_id, '-', ifnull(commission_pct, '?')) FROM employees;
```
<img src="./img/11.png">


## 条件查询
语法：
select 字段 from 表名 where 筛选条件
* 简单的条件运算符：>, <, = , !=, <>, >=, <=
* 逻辑运算符：
    * && ，|| ， !
    * and , or , not
* 模糊查询：
    * like
    * between and 
    * in 
    * is null
    * is not null

### 条件运算符的运用。
查询工资大于5000的员工信息
```sql
SELECT * FROM employees where salary > 5000;
```
<img src="./img/12.png">

查询部门编号不等于13的员工名和部门编号；
```sql
SELECT last_name, department_id FROM employees where department_id != 13;
```
<img src="./img/13.png">
```sql
SELECT last_name, department_id FROM employees where department_id <> 13;
```
<img src="./img/14.png">

### 逻辑运算的运用
查询工资在5000到10000，之间的员工名、工资及奖金
```sql
SELECT * from employees where department_id < 50 OR department_id > 100 or salary > 5000;
```
<img src="./img/15.png">

查询部门编号不是在90到110之间，或者工资高于10000的员工信息
方式一

```sql
SELECT * from employees where NOT (department_id > 50 AND department_id < 100) or salary > 5000;
```
<img src="./img/17.png">
方式二
 
```sql
SELECT * from employees where department_id < 50 OR department_id > 100 or salary > 5000;
```
<img src="./img/16.png">

## 模糊查询
* like 
    * % -> 一个或者多个任意字符
    * _ -> 一个任意字符
查询员工名中包含字符`a`的员工信息

```sql
SELECT * from employees WHERE last_name LIKE '%a%';
```
<img src="./img/18.png">

第三个字符是`h`的名字
```sql
select last_name from employees where last_name LIKE '__h%';
```
<img src="./img/19.png">

第四个字符是下划线`_`的名字

```sql
SELECT last_name from employees where last_name like '___\_%';
```

<img src="./img/20.png">

解析:用 `\`转义`_`为普通字符


ESCAPE关键字声明转义字符（官方推荐）
```sql
SELECT last_name from employees where last_name like '___$_%' ESCAPE '$';
```

<img src="./img/21.png">

### between and
查询员工编号在100 到120 之间的员工信息；

```sql
SELECT * from employees where employee_id BETWEEN 20 AND 30;
```
* 注意事项
    1. 包含起始和终止的值
    2. 必须是升序

## in 关键字

查找名字是`qin`, `ad`, `add`的用户信息
方式一：

```sql
SELECT * from employees where first_name = 'qin' or first_name = 'ad' or first_name = 'add';
```
<img src="./img/23.png">

方式二：

```js
SELECT * from employees where first_name in ('qin', 'ad', 'add');
```
<img src="./img/24.png">


## is null 的用法
查找没有奖金的员工信息
错误的做法
```sql
SELECT last_name FROM employees where commission_pct = null;
```
<img src="./img/25.png">

解析：因为`=`不能判断 `null`

```sql
SELECT * FROM employees where commission_pct is null;
```
<img src="./img/26.png">

## is not null 的用法
查找有奖金的员工信息
```sql
SELECT * FROM employees where commission_pct is not null;
```
<img src="./img/27.png">

## 安全等于 <=>
符号的意思是判断是否等于

查找没有奖金的员工信息
```sql
SELECT * FROM employees where commission_pct <=> null;
```
<img src="./img/28.png">

## 排序 order by
语法：

select 字段名
from 表名
[where 条件]
[order by asc | desc]

特点：
 * 1、asc 为升序(默认)，desc 为降序
 * 2、order by 子句中可以支持的排序的有：字段，表达式，别名，函数，多个字段
 * 3、order by 子句一般放在查询语句的后面，limit子句除外

--- 

* 单个字段查询
按工资降序排序查询员工信息

```sql
SELECT * FROM employees order by salary DESC ;
```
<img src="./img/29.png">

* 表达式查询 
按年薪降序排序查询员工姓名和年薪
```sql
SELECT last_name, salary * 12 *  IFNULL(commission_pct, 1) FROM employees  order by salary * 12 *  IFNULL(commission_pct, 1) desc;
```
<img src="./img/30.png">

* 别名查询 
按年薪降序排序查询员工姓名和年薪
```sql
SELECT last_name, salary * 12 *  IFNULL(commission_pct, 1) 年薪 FROM employees  order by 年薪 desc;
```
<img src="./img/31.png">

* 函数查询
按名字的长度降序，显示员工信息;
```sql
SELECT last_name, salary * 12 *  IFNULL(commission_pct, 1) 年薪 FROM employees  order by 年薪 desc;
```
<img src="./img/32.png">

* 多个字段同时查询
员工id升序，工资降序查询员工信息
```sql
SELECT * FROM  employees order by employee_id, salary DESC ;
```
<img src="./img/33.png">

---

# 常用函数
调用
```
select 函数名(实参)
```

分类
1. 单行函数
    * concat, length, ifnull等
2. 分组函数
    * 字符函数
    * 数学函数
    * 日期函数
    * 其他函数
    * 流程控制函数
## 字符函数
1. length
查询字符串的`字节`长度
```sql
select length('你好abcd');
```
output: 10

2. concat
合并多个字符成一个字符
查询员工的姓名，中间用`※`隔开，起别名为`姓名`
```sql
select concat()
```
<img src="./img/34.png">

3. lower/upper
lower 转小写
upper 转大写
```sql
select lower('ABC');
# output  =>  abc
```

```sql
select upper('efg')
# output =>  EFG
```

4. substr/substring
截取字符串。传入的函数参数不同，实现不同的函数重装

```sql
select substr('abcdef', 2);
# output => bcdef
# ps: 截取的字符串，起始下标是1
```

查询用户姓名。第一个姓的字母大写，其他字母小写，用`-`隔开
```sql
SELECT CONCAT(UPPER(SUBSTRING(first_name, 1, 1)), substring(first_name, 2) , '-', LOWER(last_name)) 姓名 from employees;
```
<img src="./img/35.png">

5. instr
查找某个字符串是否在某个给定的字符串中，并返回查找的字符串的开始下标;查不到返回0
```sql
select instr('abcdef', 'de');
# output => 4

select instr('abcdef', 'g');
# output => 0
```

6. trim
去掉前后空格、某个种格式的字符
```sql
select length(trim('    abc    '));
# output => 3

select trim('aa' from 'aaaaaaa好的aaaaa好的aaaa');
# output => 好的aaaaa好的
```

7. lpad
parameter：
第一个：目标字符串
第二个：到指定长度
第三个：要填充的字符串
给定字符串左边填充某个字符串，到给定长度。

```sql
select lpad('嗯', 12, "*");
# 嗯 字符串 前面填充 *  直到目标字符串长度为12
# output => ***********嗯
```
8. rpad
参数同上，当前函数在右边填充字符

```sql
select rpad('好', 5, '啊');
# output => 好啊啊啊啊
```

9. replace
替换，概念参考js的replace
```sql
select replace('abcdefgf', 'cdef', ' **** ');
# output => ab **** gf
```

## 数学函数
### round() 四舍五入
```sql
select round(1.5);
# output => 2
select round(-1.5);
# output => -2
select round(1.245, 2);
# output => 1.25
```
### ceil() 向上取整
```sql
select ceil(1.2);
# output => 2
select ceil(-2.3);
# output => -2
```

### floor() 向下取整
```sql
select floor(1.2);
# output => 1
select floor(-2.3);
# output => -3
```
### mod() 取余数
```sql
select mod(10, 3);
# output => 1
SELECT 10 % 3;
# output => 1
```

## 日期函数
### now 返回当前系统日期时间
```sql
select now();
# output => 2020-11-30 13:01:38
```

# 获取年，月，日，时，分，秒
```sql
select SELECT YEAR(now());
# output => 2020
SELECT YEAR(now()); # 2020
SELECT YEAR("1999-1-1 20:59:59"); # 1999
SELECT MONTH("1999-1-1 20:59:59"); # 1
SELECT MONTHNAME(NOW()); # November
SELECT DAYOFMONTH("1999-1-2 20:59:58");
SELECT DAY("1999-1-1 20:59:59"); # 1
```

# str_to_date

|符合|解析|
|---|------|
|%Y|四位的年|
|%y|2位的年份|
|%m|月份(01,02,...,11,12)|
|%c|月份(1,2,...,11,12)|
|%d|日(01,02,...)|
|%H|小时(24小时制)|
|%h|小时(12小时制)|
|%i|分钟(00,01,...,59)|
|%s|秒(00,01,...,59)|


```sql
SELECT str_to_date('1999-6-8', '%Y-%m-%d');
# 1999-06-08
```

### date_fromat() 将时间转成指定格式
```sql
select date_format('2022-01-26', '%c月/%Y年 --%d日');
# 1月/2022年 --26日
```

```sql
SELECT DATE_FORMAT(hireadate, '%m月/%d日 %y年') from employees;
```
<img src="./img/36.png">

---

## 其他函数

### version(), datebase(), user();
查询当前mysql的版本号
```sql
select version();
# 8.0.22
```
查询当前 use database的数据
```sql
select database();
# myemployees
```

查询当前用户
```sql
select user();
# root@192.168.196.1
```

## 流程控制预计
### IF() 类似于js的 if eles 或者三元表达式
```sql
select if(10 > 9, '大', '小');
# 大
```
### case when then end
实现语法逻辑与js相同的功能
```js
var val = 2;
switch (val) {
    case 1 :
        console.log('我是1');
        break;
    case 2 :
        console.log('我是2');
        break;
    default:
        console.log('我不知道');
        break;
}
```
在mysql中实现js中`switch case`的逻辑;
```sql
select
case 2
when 1 then '我是1'
when 2 then '我是2'
else '我不知道你是谁'
end;
```
案例：
当部门是133的，工资减半
当部门是1203的，工资打7折
其他为9折
```sql
SELECT salary 原始工资, 
case salary
when 133 then salary * 0.5
when 1203 then salary * 0.7
else salary * 0.9
end 打折
from employees;
```
在js中 `if() else if ()`
```js
var a = 3
if(a < 2) {
    console.log('我小于2')
} else if (a < 3) {
    console.log('我小于3')
} else if (a < 4) {
    console.log('我小于4')
} else {
    console.log('我也不知道怎么算')
}
```
在mysql中实现
案例：
当工资大于20000 显示为高层
当工资大于10000 显示为中层
否则 老铁，你的工资没有毛病
```sql
select salary,
case 
when salary > 20000 then '高层'
when salary > 10000 then '中层'
else '老铁，你的工资没有毛病'
end 薪资划分
from employees;
```
<img src="./img/38.png">

# 分组函数





