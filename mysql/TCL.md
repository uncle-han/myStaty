# TCL 事务控制语言 transaction control language
* 什么是事务
一个或者一组sql语句组成一个执行单元，这个执行单元要么全部执行，要不全部不执行
    * 举例子： 张三丰有1000块钱，郭襄有1000块钱，当张三丰给郭襄转账500的时候应该是会有一些sql要执行。
        1. 先扣掉张三丰500块钱: update 表 set 金额=500 where name=张三丰
        2. 郭襄的钱增加500块钱： update 表 set 金额=1500 where name=郭襄 
    但是。可能在执行完`1`的时候，数据库就挂了，不执行`2`了，这个时候数据库就会出现数据不可靠的情况，理想的处理是，两个sql都执行完，其中有一个没有执行完，就回退到上一次的状态，确保数据的可靠，事务就是用来处理这些问题的

* 事务的属性

|属性|解析|
|---|----|
| 原子性(Atomicity)|原子性是指事务包含的所有操作要么全部成功，要么全部失败回滚，因此事务的操作如果成功就必须要完全应用到数据库，如果操作失败则不能对数据库有任何影响。|
|一致性（Consistent）|一致性是指事务必须使数据库从一个一致性状态变换到另一个一致性状态，也就是说一个事务执行之前和执行之后都必须处于一致性状态。举例来说，假设用户A和用户B两者的钱加起来一共是1000，那么不管A和B之间如何转账、转几次账，事务结束后两个用户的钱相加起来应该还得是1000，这就是事务的一致性。|
|隔离性(Isolation)|隔离性是当多个用户并发访问数据库时，比如同时操作同一张表时，数据库为每一个用户开启的事务，不能被其他事务的操作所干扰，多个并发事务之间要相互隔离。关于事务的隔离性数据库提供了多种隔离级别，稍后会介绍到。|
|持久性(Durability)|持久性是指一个事务一旦被提交了，那么对数据库中的数据的改变就是永久性的，即便是在数据库系统遇到故障的情况下也不会丢失提交事务的操作。例如我们在使用JDBC操作数据库时，在提交事务方法后，提示用户事务操作完成，当我们程序执行完成直到看到提示后，就可以认定事务已经正确提交，即使这时候数据库出现了问题，也必须要将我们的事务完全执行完成。否则的话就会造成我们虽然看到提示事务处理完毕，但是数据库因为故障而没有执行事务的重大错误。这是不允许的。|


* 事务的创建
    * 隐式事务：事务没有明显开启和结束的标志，如insert, update,delete语句
        * ``` delete from 表 where id = 1 ```
    * 显式事务：事务具有明显的开启和结束标志
        * 必须设置自动提交功能为禁用 `set autocommit=0`

* 显式事务开始方式
```sql
set autocommit=0; # 必须执行
start transaction; # 可选不执行
update tab set amount=500 where name='张三丰'; # sql 1
update tab set amount=1500 where name='郭襄'; # sql 2
commit; # 或者是 rollback
```

* 列子

```sql 
CREATE TABLE IF NOT EXISTS tab(
		name VARCHAR(20) PRIMARY KEY,
		amount INT UNSIGNED
);

INSERT INTO tab VALUES('张三丰', 1000), ('郭襄', 1000);

SELECT * FROM tab;


SET autocommit=0;
START TRANSACTION;
UPDATE tab SET amount= ( (SELECT TT.cash FROM ( SELECT T.amount AS cash FROM tab T WHERE name='张三丰' ) TT ) - 500) WHERE name='张三丰';
UPDATE tab SET amount= ( (SELECT TT.cash FROM ( SELECT T.amount AS cash FROM tab T WHERE name='郭襄' ) TT ) + 500) WHERE name='郭襄';
COMMIT;
```

* 事务出现的问题
对于同时运行的多个事务，当这些事务访问数据库中**相同的数据**时,如果不采取必要的隔离机制，会出现各种并发问题
    * 脏读： 对于两个事务T1,T2，T1 读取了已经被T2更新且还没有被提交的字段之后，若T2回滚，T1读取的内容就是临时且无效的
    * 不可能重复读：对于两个事务T1,T2，T1读取了一个字段，然后T2**更新**了该字段之后，T1再次读取相同一个字段，值就不同了
    * 幻读： 对于两个事务T1,T2。T1从一个表中读取了一个字段，然后T2在该表中**插入**了一些新的行，之后，如果T1再读取同一个表，就会多出几行 


> 事务隔离级别：

| level |脏读|不可重复读|幻读|
|---|:---:|:---:|:---:|
|read uncommitted|Y|Y|Y|
|read committed|N|Y|Y|
|repeat read|N|N|Y|
|serializable|N|N|N|

* 查看当前事务隔离级别
mysql 5
```sql
select @@tx_isolation;
```

mysql 8

```sql
show variables like '%transaction_isolation%';
```

* 修改数据隔离级别

```sql
set session transaction isolation level read committed;
```

> 视图 view
本事是一个虚拟表，在真实表查询出来的。保存了sql的逻辑

* 创建视图

```sql
CREATE VIEW v_name_salary
AS
SELECT last_name, salary from employees;
```

1. 相当于把查询的结果赋值给一个变量(视图),可以在往后复用，
2. 对数据保护起来，对可以公共查看到放到视图里面

<img src="./img/93.png">

* 使用视图

    * 查看视图的内容

```sql
SELECT * FROM v_name_salary ;
```

<img src="./img/94.png">

* 加条件筛选，排序

```sql
SELECT salary FROM v_name_salary WHERE salary > 5000 ORDER BY salary;
```

<img src="./img/95.png">

> 修改视图

```sql
CREATE OR REPLACE view v_name_salary
AS
SELECT last_name, salary FROM employees WHERE salary = 6200;
```
ps: 也可以用上面的方式创建视图


查看修改之后的视图

<img src="./img/96.png">

> 删除视图

可以同时删除多个

```sql
DROP VIEW v_name_salary;
```

> 更新视图
对视图更新之后，原表也回被更新到
* 插入 (insert)

```sql
insert into v_name_salary VALUES ('qqh', 300000);
```

<img src="./img/97.png">

* 更新 (update)

```sql
UPDATE v_name_salary SET last_name = '覃淇韩' WHERE last_name = 'qqh';
```

<img src="./img/98.png">

* 删除

```sql
DELETE FROM v_name_salary WHERE last_name = '覃淇韩';
```

<img src="./img/99.png">


## 变量

* 系统变量
    * 全局变量 global
    * 回话变量  session
* 自定义变量
    * 用户变量
    * 局部变量

> 系统变量
变量由系统提供的，不是用户定义，属于服务器层面

note: 如果是全局级别的，则需要加global,如果是会话级别，则需要加session，不写默认是session的

使用的方法：
1. 查看系统所有变量
```sql
show global | session variables;
```
2. 查看满足条件的部分系统变量
```sql
show global | \[session\] variabels like '%name%'
```
3. 查看指定的某个系统变量的值
```sql
select @@global | [session].系统变量名
```
4. 为某个系统变量赋值
    * 方式一：
```sql
set global | [session] 系统变量名 = 值;
e.g: set autocommit=0;
```

   * 方式二

```sql
set global | [session].系统变量名=值
```


