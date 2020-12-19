# redis 学习笔记
## 安装
点击[下载](https://download.redis.io/releases/redis-6.0.9.tar.gz)redis-6.0.9

> 上传到服务器
```bash
# 解压
tar -xvf redis-6.0.9.tar.gz
# 重命名redis
mv redis-6.0.9.tar.gz ./redis
# 删除旧的包
rm -rf redis-6.0.9.tar.gz
# 进入
cd redis
# 编译，会生成一个src目录
make
# 复制一份配置文件redis.conf
cp redis.conf ./redis.conf.init
# 修改配置文件，让redis后台启动
vim redis.conf
```
<img src="./img/1.png">

```bash
# 在redis目录下，将配置文件，复制到src目录下
cp redis.conf src/
# 进入src目录下
cd src/
# 启动redis-server
./redis-server
# 启动redis-cli
./redis-cli
```
> 进入到redis数据界面，测试数据是否正常
```bash
127.0.0.1:6379> ping
PONG
127.0.0.1:6379> 
```
redis数据库安装成功，撒花

## 对key的操作
> `del` key [key ...]

删除key,
```sql
127.0.0.1:6379> set name qqh
OK
127.0.0.1:6379> get name 
"qqh"
127.0.0.1:6379> del name
(integer) 1
127.0.0.1:6379> 
```
> `exists` key [key ...]

查看key是否存在
```sql
127.0.0.1:6379> exists name
(integer) 1
127.0.0.1:6379> exists name1
(integer) 0
127.0.0.1:6379> 
```
> expire key seconds

给key添加过期时间，以秒s为单位，过期后不可用
```sql
# 给name添加过期时间，为10s
127.0.0.1:6379> expire name 10
(integer) 1
127.0.0.1:6379> ttl name # 检查name字段还剩多少时间过期
(integer) 3 # 还剩3s
127.0.0.1:6379> ttl name
(integer) -2 # 已过期
127.0.0.1:6379> get name
(nil) # 已经无法再拿到key
```

> `pexpire` key milliseconds

给字段设置过期时间，以毫秒为单位
```sql
127.0.0.1:6379> set k1 v1
OK
127.0.0.1:6379> pexpire k1 20000
(integer) 1
127.0.0.1:6379> ttl k1
(integer) 16
127.0.0.1:6379> ttl k1
(integer) -2
127.0.0.1:6379> exists k1
(integer) 0
127.0.0.1:6379> 
```

> `keys` pattern

查找给定格式的key

```sql
# 查找所有key
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3
OK
127.0.0.1:6379> keys *
1) "k3"
2) "k2"
3) "k1"
```

> `pttl` milliseconds

以毫秒的形式返回key剩余的过期时间

```sql
127.0.0.1:6379> set k1 b1
OK
127.0.0.1:6379> pexpire k1 10000
(integer) 1
127.0.0.1:6379> pttl k1
(integer) 5101
127.0.0.1:6379> pttl k1
(integer) -2
127.0.0.1:6379> exists k1
(integer) 0
127.0.0.1:6379> 
```

> `ttl` seconds

以秒为单位，返回key剩余的过期时间
```sql
127.0.0.1:6379> set k3 v3
OK
127.0.0.1:6379> expire k3 10
(integer) 1
127.0.0.1:6379> ttl k3
(integer) 6
127.0.0.1:6379> 
```

> `move` key db

将key移动到其他数据，被移走后，当前数据库不存在被移走的key

```sql
127.0.0.1:6379> set key1 value1
OK
127.0.0.1:6379> select 1 
OK
127.0.0.1:6379[1]> exists key1
(integer) 0
127.0.0.1:6379[1]> select 0
OK
127.0.0.1:6379> move key1 1
(integer) 1
127.0.0.1:6379> get key1
(nil)
127.0.0.1:6379> select 1
OK
127.0.0.1:6379[1]> exists key1
(integer) 1
127.0.0.1:6379[1]> 
```

> `randomkey`

从数据库中随机返回一个key

```sql
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3 k4 v4
OK
127.0.0.1:6379> randomkey
"k2"
127.0.0.1:6379> randomkey
"k1"
127.0.0.1:6379> randomkey
"k4"
127.0.0.1:6379> 
```

> `rename` key newkey

将旧key修改成新key

```sql
127.0.0.1:6379> set old hahaha
OK
127.0.0.1:6379> rename old new
OK
127.0.0.1:6379> get old
(nil)
127.0.0.1:6379> get new
"hahaha"
127.0.0.1:6379> 
```

> `renamenx` key newkey

当要成的新key不存在则成功，存在着不成功

```sql
127.0.0.1:6379> keys *
1) "k3"
2) "k4"
127.0.0.1:6379> renamenx k3 k2 # k2不存在
(integer) 1 # 成功
127.0.0.1:6379> keys *
1) "k4"
2) "k2"
127.0.0.1:6379> renamenx k2 k4 # k4存在
(integer) 0 # 不成功
127.0.0.1:6379> 
```

> persist key

将有设置过期时间的key，去掉过期时间，变成永久保存

```bash
127.0.0.1:6379> set time yyyyyyyy
OK
127.0.0.1:6379> get time
"yyyyyyyy"
127.0.0.1:6379> pexpire time 60000
(integer) 1
127.0.0.1:6379> pttl time
(integer) 37192
127.0.0.1:6379> persist time
(integer) 1
127.0.0.1:6379> pttl time
(integer) -1
127.0.0.1:6379> get time
"yyyyyyyy"
```

> `type` key

检测key对应的值的类型

```sql
127.0.0.1:6379> get k1
"v1"
127.0.0.1:6379> type k1
string
```

## string 类型

> `set` key value

生成一个键对值

```bash
127.0.0.1:6379> set a1 b1
OK
127.0.0.1:6379> get a1
"b1"
```

> `get` key

获取key对应的value

```bash
127.0.0.1:6379> get k1
"v1"
127.0.0.1:6379> keys *
 1) "k12"
 2) "k5"
 3) "k2"
 4) "k9"
 5) "k13"
 6) "k10"
 7) "k4"
 8) "k7"
 9) "k8"
10) "k1"
11) "k3"
12) "k6"
13) "k11"
14) "a1"
127.0.0.1:6379> get k20
(nil)
127.0.0.1:6379> 
```

> `getrange` key start end

截取对应键名起始下标之间的值

```bash
127.0.0.1:6379> set letter abcdefghikj
OK
127.0.0.1:6379> getrange letter 1 5
"bcdef" # 下标从0开始
127.0.0.1:6379> getrange aaaa 1 2 # 不存在
""
127.0.0.1:6379> 
```

> `getset` key newvalue

先获取对应key的值，在给对应的key设置新的值

```bash
127.0.0.1:6379> get k1
"v1"
127.0.0.1:6379> getset k1 vvv
"v1"
127.0.0.1:6379> get k1
"vvv"
```

> `mset` key value [key value ...]

同时设置多个字段
```bash
127.0.0.1:6379> keys *
(empty array)
127.0.0.1:6379> mset k1 v1 k2 v2 k3 v3
OK
127.0.0.1:6379> keys *
1) "k3"
2) "k2"
3) "k1"
```

> `setnx` key value

设置key对应的值，当key不存在的时候，才设置，存在的时候设置失败

```bash
127.0.0.1:6379> get k3
"v3"
127.0.0.1:6379> set k3 v1 # 设置原本存在的key，会被覆盖
OK
127.0.0.1:6379> get k3
"v1"
127.0.0.1:6379> setnx k3 v4 # 原本存在的key，不会设置成功
(integer) 0
127.0.0.1:6379> get k3
"v1"
127.0.0.1:6379> keys * 
1) "k3"
2) "k2"
3) "k1"
127.0.0.1:6379> setnx k4 v4 # 不存在的key，不会成功
(integer) 1
```

> `setrange` key offset value

设置给定的key的值，从偏移量开始填充
* 偏移量大于key给定的值的字符串长度，就在最后添加
* 给定的偏移量小于key的值的字符串长度，会覆盖原来的值

```bash
127.0.0.1:6379> get k2
"v2"
127.0.0.1:6379> setrange k2 2 AA # 大于给定key的字符串的长度
(integer) 4
127.0.0.1:6379> get k2
"v2AA"
127.0.0.1:6379> get letter
"abcdefghijk"
127.0.0.1:6379> setrange letter 3 AAA # 小于原来的key的长度
(integer) 11
127.0.0.1:6379> get letter
"abcAAAghijk"
```

> `setex` key seconds value

设置键名和对应的值，并给予过期时间，过期时间是秒

```bash
127.0.0.1:6379> setex time 20 seconds
OK
127.0.0.1:6379> ttl time
(integer) 14
127.0.0.1:6379> ttl time
(integer) 11
127.0.0.1:6379> ttl time
(integer) 6
127.0.0.1:6379> ttl time
(integer) 0
127.0.0.1:6379> ttl time
(integer) -2
127.0.0.1:6379> get time
(nil)
```

> `strlen` key

返回key对应的值的长度

```bash
127.0.0.1:6379> get letter
"abcAAAghijk"
127.0.0.1:6379> strlen letter
(integer) 11
```

> msetnx key value [key value]

当要设置的key都不存在，则设置成功，当设置的键名有一个存在，则都不成功`mset`和 `setnx`命令的组合

```bash
127.0.0.1:6379> keys *
1) "k2"
2) "k1"
127.0.0.1:6379> msetnx k1 b1 k2 b2 k3 b3 # 当前存在k1 k2
(integer) 0 # 设置不成功
127.0.0.1:6379> mget k1 k2 k3
1) "v1"
2) "v2"
3) (nil) # 获取不到
127.0.0.1:6379> msetnx k3 b3 k4 b4 # k3 k4 都不存在
(integer) 1
127.0.0.1:6379> mget k1 k2 k3 k4
1) "v1"
2) "v2"
3) "b3" # 正确获取到
4) "b4" # 正确获取到
```

> psetex key milliseseconds value

与`setex` 类似，但是是给键名设置毫秒数

```bash
127.0.0.1:6379> psetex millise 20000 xxxxxxxxxxxx
OK
127.0.0.1:6379> pttl millise
(integer) 11018
```

> incr key 

给对应的key加1操作，只能自增数组类型

```bash
127.0.0.1:6379> set A a
OK
127.0.0.1:6379> incr A
(error) ERR value is not an integer or out of range
127.0.0.1:6379> set num 1
OK
127.0.0.1:6379> incr num
(integer) 2
127.0.0.1:6379> incr num
(integer) 3
127.0.0.1:6379> set ten 10
OK
127.0.0.1:6379> incr ten
(integer) 11
```

> incrby key increment

对指定的key自增给定的量

```
127.0.0.1:6379> get num
"15"
127.0.0.1:6379> incrby num 5
(integer) 20
```

> incrbyfloat key increment

增加浮点类型的数组给指定的key相加

```bash
127.0.0.1:6379> set num 20
OK
127.0.0.1:6379> incrbyfloat num 0.001
"20.001"
```

> decr key

对指定的key自减1操作

```
127.0.0.1:6379> set num 10
OK
127.0.0.1:6379> get num
"10"
127.0.0.1:6379> decr num
(integer) 9
127.0.0.1:6379> decr num
(integer) 8
127.0.0.1:6379> 
```

> decrby

对指定的key，减一定量的值，对数组起作用

```bash
127.0.0.1:6379> get num
"8"
127.0.0.1:6379> decrby num 5
(integer) 3
127.0.0.1:6379> decrby num aa
(error) ERR value is not an integer or out of range
```

> append key value

对指定的key后面追加value，不存在的key，会新建

```
127.0.0.1:6379> set letter abcd
OK
127.0.0.1:6379> append letter -efgh
(integer) 9
127.0.0.1:6379> get letter 
"abcd-efgh"
127.0.0.1:6379> set num 123
OK
127.0.0.1:6379> append num 456
(integer) 6
127.0.0.1:6379> get num
"123456"
127.0.0.1:6379> keys *
1) "num"
2) "letter"
127.0.0.1:6379> append k1 v1
(integer) 2
127.0.0.1:6379> get k1
"v1"
```

## list 类型

* Redis列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）
* 一个列表最多可以包含 232 - 1 个元素 (4294967295, 每个列表超过40亿个元素)。

> lpush key value [value ...]

生成给定的key的list数据，可以同时push多个

```bash
127.0.0.1:6379> lpush list1 a b c d
(integer) 4 # 返回list的长度
127.0.0.1:6379> get list
(nil)
127.0.0.1:6379> get list1 # get是针对字符串的
(error) WRONGTYPE Operation against a key holding the wrong kind of value
127.0.0.1:6379> lrange list1 0 10 # 需要lrange查看范围内的字符
1) "d"
2) "c"
3) "b"
4) "a"
127.0.0.1:6379> lpush list1 e # 可以对已经存在的list进行push操作
(integer) 5
127.0.0.1:6379> lrange list1 0 10
1) "e"
2) "d"
3) "c"
4) "b"
5) "a"
127.0.0.1:6379> type list1 # 检查list的数据类型
list
127.0.0.1:6379>
```

> blpop key [key ...] timeout

* 从边开始删除一/多个元素，如果列表没有元素会`阻塞`列表直到等待`超时`或发现`可弹出`元素为止。
* 超时设置以秒(s)为单位

```bash
127.0.0.1:6379> lrange list 0 10 # 为空的list
(empty array)
127.0.0.1:6379> lpush list a b # 新建list
(integer) 2
127.0.0.1:6379> lrange list 0 10 # 获取一定范围内的list
1) "b"
2) "a"
127.0.0.1:6379> blpop list 10 # 从这边删除一个，就回去当前元素
1) "list"
2) "b" # 获取到被删除的第一个元素
127.0.0.1:6379> lrange list 0 10 # 查看被删除的list
1) "a"
127.0.0.1:6379> blpop list1 10 # 查看不存在的list1
(nil)
(10.03s) # 超时退出
127.0.0.1:6379> 
```

> brpop key [key ...] timeout

和blpop类似，但是brpop是从右边删除,被获取被删除的元素

```bash
127.0.0.1:6379> lpush Llist a b
(integer) 2
127.0.0.1:6379> lrange Llist 0 10
1) "b"
2) "a"
127.0.0.1:6379> brpop Llist 10
1) "Llist"
2) "a"
127.0.0.1:6379> lrange Llist 0 10
1) "b"
127.0.0.1:6379> brpop Llist1 5
(nil)
(5.09s)
127.0.0.1:6379>
```

> brpoplpush source destination timeout

source key 最后一个/右边第一个删除,并放到目标key的第一个位置/最左边的位置，如果不存在source或者为空，会阻塞列表，直到超时，或者有可以弹出的元素

```bash
127.0.0.1:6379> lrange L 0 10
1) "b"
2) "a"
127.0.0.1:6379> lrange R 0 10
1) "d"
2) "c"
127.0.0.1:6379> brpoplpush L R 10
"a"
127.0.0.1:6379> lrange L 0 10
1) "b"
127.0.0.1:6379> lrange R 0 10
1) "a"
2) "d"
3) "c"
127.0.0.1:6379> 
```

> lindex key index

获取对应键名对应的下标值

```bash
127.0.0.1:6379> lpush ind a b c d
(integer) 4
127.0.0.1:6379> lindex ind 1
"c"
127.0.0.1:6379> lrange ind 0 10
1) "d"
2) "c"
3) "b"
4) "a"
```

> linsert



> llen

查看对应的list的长度

```
127.0.0.1:6379> lrange ind 0 10
1) "d"
2) "c"
3) "b"
4) "a"
127.0.0.1:6379> llen ind
(integer) 4
127.0.0.1:6379> 
```

> lpop

* 在指定的list删掉第一个/左边开始，并返回删除的那个元素

```bash
127.0.0.1:6379> lrange mylist 0 10
1) "c"
2) "b"
3) "a"
127.0.0.1:6379> lpop mylist # 删除最左边的元素
"c"
127.0.0.1:6379> lrange mylist 0 10
1) "b"
2) "a"
127.0.0.1:6379> 
```

> lpushx

和lpush功能完全类似，
* lpush，如果key存在，则往前面追加，不存在，则新建key，追加到前面

* lpushx，如果key不存在，则不会成功追加，key存在才会成功追加


```bash
127.0.0.1:6379> lrange mylist 0 10
1) "b"
2) "a"
127.0.0.1:6379> lpushx mylist c #存在
(integer) 3 # 追加成功
127.0.0.1:6379> lrange mylist 0 10
1) "c" # 追加到前面
2) "b"
3) "a"
127.0.0.1:6379> lpush mylist C
(integer) 4
127.0.0.1:6379> lrange mylist 0 10
1) "C"
2) "c"
3) "b"
4) "a"
127.0.0.1:6379> lpushx mylist1 D
(integer) 0
127.0.0.1:6379> lrange mylist1 0 10
(empty array)
127.0.0.1:6379> lpush mylist2 E
(integer) 1
127.0.0.1:6379> lrange mylist2 0 10
1) "E"
```

> lrange

* 查看对应的key的范围内的值

```bash
127.0.0.1:6379> lpush mylist a b c d
(integer) 4
127.0.0.1:6379> lrange mylist 0 10 # 查看范围0 - 10之间的值
1) "d"
2) "c"
3) "b"
4) "a"
127.0.0.1:6379> lrange mylist 0 -1 # 查看0 到 最后一个的值
1) "d"
2) "c"
3) "b"
4) "a"
127.0.0.1:6379> lrange mylist 0 -2 # 查看 0 到倒数第二个的值
1) "d"
2) "c"
3) "b"
```

> lrem key count value

根据给定的key，删除一定数量的value

* count > 0，从key的开头开始搜索，删除count个value

```bash
127.0.0.1:6379> lrange list1 0 -1
 1) "d"
 2) "c"
 3) "b"
 4) "a"
 5) "a"
 6) "a"
 7) "a"
 8) "a"
 9) "a"
10) "a"
127.0.0.1:6379> lrem list1 5 a
(integer) 5
127.0.0.1:6379> lrange list1 0 -1
1) "d"
2) "c"
3) "b"
4) "a"
5) "a"
127.0.0.1:6379> 
```

* count < 0，从key尾部开始搜索，删除绝对值count个value

```bash
127.0.0.1:6379> lrange list2 0 -1
 1) "c"
 2) "c"
 3) "c"
 4) "c"
 5) "c"
 6) "c"
 7) "c"
 8) "c"
 9) "b"
10) "a"
127.0.0.1:6379> lrem list2 -5 c
(integer) 5
127.0.0.1:6379> lrange list2 0 -1
1) "c"
2) "c"
3) "c"
4) "b"
5) "a"
```

* count = 0，删除key里面所有与value相等的值

```bash
127.0.0.1:6379> lpush list4 a b b b b b b b c
(integer) 9
127.0.0.1:6379> lrem list4 0 b
(integer) 7
127.0.0.1:6379> lrange list4 0 -1
1) "c"
2) "a"
```


> lset key index value

通过下标修改对应key的值

```bash
127.0.0.1:6379> lrange list4 0 -1
1) "c"
2) "a"
127.0.0.1:6379> lset list4 1 B
OK
127.0.0.1:6379> lrange list4 0 -1
1) "c"
2) "B"
```

> ltrim

修剪，将不在给定区间范围内的元素删除掉

```bash
127.0.0.1:6379> rpush list a b c d e f g h i j k l m n
(integer) 14
127.0.0.1:6379> lrange list 0 -1
 1) "a" # 0
 2) "b" # 1
 3) "c" # 2
 4) "d" # 3
 5) "e" # 4
 6) "f" # 5
 7) "g" # 6
 8) "h" # 7
 9) "i" # 8
10) "j" # 9
11) "k" # 10
12) "l" # 11
13) "m" # 12
14) "n" # 13
127.0.0.1:6379> ltrim list 2 10
OK
127.0.0.1:6379> lrange list 0 -1
1) "c"
2) "d"
3) "e"
4) "f"
5) "g"
6) "h"
7) "i"
8) "j"
9) "k"
127.0.0.1:6379> 
```

> rpop

从右边/最后面删除一个，并返回

```bash
127.0.0.1:6379> lrange list 0 -1
1) "c"
2) "d"
3) "e"
4) "f"
5) "g"
6) "h"
7) "i"
8) "j"
9) "k"
127.0.0.1:6379> rpop list 
"k"
127.0.0.1:6379> lrange list 0 -1
1) "c"
2) "d"
3) "e"
4) "f"
5) "g"
6) "h"
7) "i"
8) "j"
```

> rpoplpush

从目标list最后面(右边第一个)删除一个元素，并将删除的元素push到另外一个list最前面(左边第一个)

```bash
127.0.0.1:6379> lpush up A B C
(integer) 3
127.0.0.1:6379> lpush low a b c
(integer) 3
127.0.0.1:6379> lrange up 0 -1
1) "C"
2) "B"
3) "A"
127.0.0.1:6379> lrange low 0 -1
1) "c"
2) "b"
3) "a"
127.0.0.1:6379> rpoplpush up low
"A"
127.0.0.1:6379> lrange up 0 -1 # 最后一个元素被删除
1) "C"
2) "B"
127.0.0.1:6379> lrange low 0 -1 # 前面删除的元素，被追加到最前面的位置
1) "A"
2) "c"
3) "b"
4) "a"
```

> rpush key value [value ...]

* lpush是从左边/最前面push值，rpush是从右边/最后面push值

* 如果key存在，则追加

```bash
127.0.0.1:6379> lpush L-list A B C
(integer) 3
127.0.0.1:6379> rpush R-list A B C
(integer) 3
127.0.0.1:6379> lrange L-list 0 -1
1) "C"
2) "B"
3) "A"
127.0.0.1:6379> lrange R-list 0 -1
1) "A"
2) "B"
3) "C"
```

> rpushx key value [value ...]

与lpushx功能完全类似，对已存在的list追加值

```bash
127.0.0.1:6379> rpush list A B
(integer) 2
127.0.0.1:6379> rpushx list C D 
(integer) 4
127.0.0.1:6379> lrange list 0 -1 # 已存在的key，可以追加
1) "A"
2) "B"
3) "C"
4) "D"
127.0.0.1:6379> rpushx list1 C D  # 不存在的key，追加失败，区别于rpush
(integer) 0
127.0.0.1:6379> lrange list1 0 -1 # rpush，及时rpush不存在，都会新建再追加
(empty array)
127.0.0.1:6379> rpush list1 C D
(integer) 2
127.0.0.1:6379> lrange list1 0 -1
1) "C"
2) "D"
```

## Hash
Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。

* 在js中这样定义对象的
```js
const handsomeboy = {
    name: 'qqh',
    sex: 'man',
    age: 18,
    skill: 'js html css'
}
```
* 将js对象转换为redis的hash是这样表示的

```bash
127.0.0.1:6379> HMset handsomeboy name "qqh" sex "man" age 18 skill "js html css"
OK
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "sex"
4) "man"
5) "age"
6) "18"
7) "skill"
8) "js html css"
127.0.0.1:6379> type handsomeboy
hash
```


> Hdel key field

删除一个或多个哈希表字段

```bash
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "sex"
4) "man"
5) "age"
6) "18"
7) "skill"
8) "js html css"
127.0.0.1:6379> Hdel handsomeboy sex # 删除性别sex字段
(integer) 1
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "18"
5) "skill"
6) "js html css"
```

> Hexists key field [field ...]

查看哈希表 key 中，指定的字段是否存在。

```bash
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "18"
5) "skill"
6) "js html css"
127.0.0.1:6379> Hexists handsomeboy sex # 不存在的field
(integer) 0
127.0.0.1:6379> Hexists handsomeboy name # 存在的字段field
(integer) 1
```

> Hget key field

返回给定key对应的字段的值,只返回一个值

```bash
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "18"
5) "skill"
6) "js html css"
127.0.0.1:6379> Hget handsomeboy name #查看存在的字段
"qqh"
127.0.0.1:6379> Hget handsomeboy sex # 查看不存在的字段
(nil)
127.0.0.1:6379> Hget h f #查看不存在的key和field
(nil)
```

> HgetAll

查看给定key下所有字段

```bash
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "18"
5) "skill"
6) "js html css"
127.0.0.1:6379> HgetAll handsomeboy1 # 不存在的
(empty array)
```

> HincrBy key field increment

给指定的key，对应的`数字`字段，增加给定的量

```bash
127.0.0.1:6379> HgetALL handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "18"
5) "skill"
6) "js html css"
127.0.0.1:6379> Hincrby handsomeboy age 10
(integer) 28
127.0.0.1:6379> HgetALL handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "28"
5) "skill"
6) "js html css"
```


> HincrByFloat

为哈希表key中的指定字段的浮点数值加上增量 increment

```bash
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "28"
5) "skill"
6) "js html css"
127.0.0.1:6379> HincrByfloat handsomeboy age 10.001 # 给指定指定增加
"38.001"
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "38.001"
5) "skill"
6) "js html css"
```

> Hkeys

相当于js中的一个方法

```js
const handsomeboy = {
    name: 'qqh',
    sex: 'man',
    age: 18,
    skill: 'js html css'
}

Object.keys(handsomeboy)
```

遍历出给定的key的所有字段名field

```js
127.0.0.1:6379> HgetALL handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "38.001"
5) "skill"
6) "js html css"
127.0.0.1:6379> Hkeys handsomeboy
1) "name"
2) "age"
3) "skill"
```

> Hlen

查看对应的key的长度

```bash
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "38.001"
5) "skill"
6) "js html css"
127.0.0.1:6379> Hlen handsomeboy
(integer) 3
```

> HMget key feild [field ...]

同时获取key对应的多个字段的值

```bash
127.0.0.1:6379> HMget handsomeboy name age
1) "qqh"
2) "38.001"
127.0.0.1:6379> HgetAll handsomeboy
1) "name"
2) "qqh"
3) "age"
4) "38.001"
5) "skill"
6) "js html css"
127.0.0.1:6379> 
```

> Hset key field value [field value ...]

给指定的key 添加 字段和值

```bash
127.0.0.1:6379> HgetAll handsomeboy 
1) "name"
2) "qqh"
3) "age"
4) "38.001"
5) "skill"
6) "js html css"
127.0.0.1:6379> Hset handsomeboy sex man
(integer) 1
127.0.0.1:6379> HgetAll handsomeboy 
1) "name"
2) "qqh"
3) "age"
4) "38.001"
5) "skill"
6) "js html css"
7) "sex"
8) "man"
```


> Hsetnx key field value [field value]

只有在字段 field 不存在时，设置哈希表字段的值

```bash
127.0.0.1:6379> Hsetnx handsomeboy name 'qinqihan'
(integer) 0 # 修改失败
127.0.0.1:6379> HgetAll handsomeboy
1) "name" # 因为那么字段存在
2) "qqh"
3) "age"
4) "38.001"
5) "skill"
6) "js html css"
7) "sex"
8) "man"
127.0.0.1:6379> Hsetnx handsomeboy facescore 1000 # facescore字段不存在
(integer) 1 # 添加成功
127.0.0.1:6379> HgetAll handsomeboy
 1) "name"
 2) "qqh"
 3) "age"
 4) "38.001"
 5) "skill"
 6) "js html css"
 7) "sex"
 8) "man"
 9) "facescore"
10) "1000"
```

> Hvals key
列出对应key所有的值，
相当于js中的一个方法

```js
const handsomeboy = {
    name: 'qqh',
    sex: 'man',
    age: 18,
    skill: 'js html css'
}

Object.values(handsomeboy)
```
在redis中的实现方法

```bash
127.0.0.1:6379> HgetALL handsomeboy
 1) "name"
 2) "qqh"
 3) "age"
 4) "38.001"
 5) "skill"
 6) "js html css"
 7) "sex"
 8) "man"
 9) "facescore"
10) "1000"
127.0.0.1:6379> Hvals handsomeboy
1) "qqh"
2) "38.001"
3) "js html css"
4) "man"
5) "1000"
127.0.0.1:6379> 

```

> Hscan key cursor

迭代对应hash


## Set 集合

* Redis 的 Set 是 String 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据。

* Redis 中集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。


> Sadd key value [value ...]

向集合添加一个或者多个成员

```bash
127.0.0.1:6379> Sadd left a
(integer) 1
127.0.0.1:6379> Sadd left b
(integer) 1
127.0.0.1:6379> Sadd left c
(integer) 1
127.0.0.1:6379> Smembers left
1) "c"
2) "a"
3) "b"
127.0.0.1:6379> Sadd left d e
(integer) 2
127.0.0.1:6379> Smembers left
1) "c"
2) "a"
3) "d"
4) "b"
5) "e"
127.0.0.1:6379> Sadd left a # 集合已经有了该元素，就添加失败。体现了集合的唯一性
(integer) 0
```

> Scard key

获取集合的成员数

```bash
127.0.0.1:6379> Smembers left
1) "c"
2) "a"
3) "d"
4) "b"
5) "e"
127.0.0.1:6379> Scard left
(integer) 5
```

> Sdiff

返回第一个集合与其他集合之间的差异。

```bash
127.0.0.1:6379> Smembers left
1) "c"
2) "a"
3) "d"
4) "b"
5) "e"
127.0.0.1:6379> Sadd right a b c d
(integer) 4
127.0.0.1:6379> Sdiff left
1) "a"
2) "c"
3) "b"
4) "d"
5) "e"
127.0.0.1:6379> Sdiff left right
1) "e"
127.0.0.1:6379> Sdiff right left
(empty array)
```

> Sdiffstore destination key [ key2 ]

将两个集合之间的差异，存到另外一个集合中，并返回差异

```bash
127.0.0.1:6379> Smembers left 
1) "c"
2) "d"
3) "a"
4) "b"
5) "e"
127.0.0.1:6379> Smembers right
1) "c"
2) "a"
3) "d"
4) "b"
127.0.0.1:6379> SdiffStore other left right
(integer) 1
127.0.0.1:6379> Smembers other
1) "e"
```

> Sinter key1 [key2 ]

返回两个集合的交集

```bash
127.0.0.1:6379> Smembers left
1) "c"
2) "d"
3) "a"
4) "b"
5) "e"
127.0.0.1:6379> Smembers right
1) "c"
2) "a"
3) "d"
4) "b"
127.0.0.1:6379> Sinter left right
1) "c"
2) "a"
3) "d"
4) "b"
```


> SinterStore destination key key2

找出两个集合中的交集，存到另外一个集合中

```bash
127.0.0.1:6379> Smembers center
(empty array)
127.0.0.1:6379> Smembers left
1) "c"
2) "d"
3) "a"
4) "b"
5) "e"
127.0.0.1:6379> Smembers right
1) "c"
2) "a"
3) "d"
4) "b"
127.0.0.1:6379> SinterStore center left right
(integer) 4
127.0.0.1:6379> Smembers center
1) "a"
2) "c"
3) "b"
4) "d"
```

> SisMember key member

查看是不是给定集合的成员

```
127.0.0.1:6379> Smembers left 
1) "c"
2) "d"
3) "a"
4) "b"
5) "e"
127.0.0.1:6379> Sismember left a
(integer) 1
127.0.0.1:6379> Sismember left f
(integer) 0
```

> Smembers

查看指定键名的所有成员

```bash
127.0.0.1:6379> Sadd myset A B C D E
(integer) 5
127.0.0.1:6379> Smembers myset
1) "B"
2) "A"
3) "D"
4) "C"
5) "E"
```

> Smove

将 member 元素从 source 集合移动到 destination 集合

```bash
127.0.0.1:6379> Sadd left FFF
(integer) 1
127.0.0.1:6379> Smembers left
1) "c"
2) "d"
3) "FFF"
4) "a"
5) "b"
6) "e"
127.0.0.1:6379> Smembers right
1) "c"
2) "a"
3) "d"
4) "b"
127.0.0.1:6379> Smove left right FFF
(integer) 1
127.0.0.1:6379> Smembers left
1) "c"
2) "d"
3) "a"
4) "b"
5) "e"
127.0.0.1:6379> Smembers right
1) "d"
2) "b"
3) "c"
4) "FFF"
5) "a"
```

> Spop key count

随机移除集合中的一(多)个成员，并返回移除的成员

```bash
127.0.0.1:6379> Smembers left
1) "c"
2) "d"
3) "a"
4) "b"
5) "e"
127.0.0.1:6379> Spop left 2
1) "d"
2) "b"
127.0.0.1:6379> Smembers left
1) "c"
2) "a"
3) "e"
```

> SrandMember

随机返回集合的成员，并没有删除

```bash
127.0.0.1:6379> Smembers right
1) "d"
2) "b"
3) "c"
4) "FFF"
5) "a"
127.0.0.1:6379> Srandmember right 3
1) "d"
2) "FFF"
3) "b"
127.0.0.1:6379> Srandmember right 3
1) "d"
2) "FFF"
3) "a"
127.0.0.1:6379> Srandmember right 3
1) "c"
2) "FFF"
3) "b"
127.0.0.1:6379> Smembers right
1) "d"
2) "b"
3) "c"
4) "FFF"
5) "a"
```

> Srem

移除集合中一(多)个成员

```bash
127.0.0.1:6379> Smembers right
1) "d"
2) "b"
3) "c"
4) "FFF"
5) "a"
127.0.0.1:6379> Srem right a b FFF
(integer) 3
127.0.0.1:6379> Smembers right
1) "c"
2) "d"
```

> Sunion

返回给定集合的并集。不存在的集合 key 被视为空集。

```bash
127.0.0.1:6379> Smembers left
1) "c"
2) "a"
3) "e"
127.0.0.1:6379> Smembers right
1) "c"
2) "d"
127.0.0.1:6379> Sunion right left
1) "a"
2) "c"
3) "e"
4) "d"
```

> SunionStore destination key1 [key2 ...]

返回给定集合的交集，并存到destination集合中

```bash
1) "c"
2) "a"
3) "e"
127.0.0.1:6379> Smembers right
1) "c"
2) "d"
127.0.0.1:6379> SunionStore box left right
(integer) 4
127.0.0.1:6379> Smembers box
1) "a"
2) "c"
3) "d"
4) "e"
```

> Sscan key cursor [march pattern] [CONUT conut]

迭代指定的集合

```
127.0.0.1:6379> Sadd program javascript java php html css c c++ c# object-c
(integer) 9
127.0.0.1:6379> Smembers program
1) "javascript"
2) "c"
3) "css"
4) "c#"
5) "php"
6) "html"
7) "java"
8) "c++"
9) "object-c"
127.0.0.1:6379> Sscan program 0 match j*
1) "0"
2) 1) "java"
   2) "javascript"
```


## 有序集合

> Zadd key score member [score member]

* 如果某个成员已经是有序集的成员，那么更新这个成员的分数值，并通过重新插入这个成员元素，来保证该成员在正确的位置上。

* 分数值可以是整数值或双精度浮点数。

* 如果有序集合 key 不存在，则创建一个空的有序集并执行 ZADD 操作。

* 当 key 存在但不是有序集类型时，返回一个错误。


```bash
127.0.0.1:6379> Zrange zLeft 0 -1
(empty array)
127.0.0.1:6379> Zadd zLeft 3 c
(integer) 1
127.0.0.1:6379> Zadd zLeft 1 a
(integer) 1
127.0.0.1:6379> Zadd zLeft 2 b
(integer) 1
127.0.0.1:6379> Zrange Zleft 0 -1
(empty array)
127.0.0.1:6379> Zrange zLeft 0 -1
1) "a"
2) "b"
3) "c"
127.0.0.1:6379> Zadd zLeft 5 e
(integer) 1
127.0.0.1:6379> Zadd zLeft 6 f 4 d
(integer) 2
127.0.0.1:6379> Zrange zLeft 0 -1
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
6) "f"
127.0.0.1:6379> Zadd zLeft 1 A 3 C
(integer) 2
127.0.0.1:6379> Zrange zLeft 0 -1
1) "A"
2) "a"
3) "b"
4) "C"
5) "c"
6) "d"
7) "e"
8) "f"
127.0.0.1:6379> Zadd zLeft 7 G
(integer) 1
127.0.0.1:6379> Zrange zLeft 0 -1
1) "A"
2) "a"
3) "b"
4) "C"
5) "c"
6) "d"
7) "e"
8) "f"
9) "G"
127.0.0.1:6379> Zadd zLeft 7 g
(integer) 1
127.0.0.1:6379> Zrange zLeft 0 -1
 1) "A"
 2) "a"
 3) "b"
 4) "C"
 5) "c"
 6) "d"
 7) "e"
 8) "f"
 9) "G"
10) "g"
```

> Zcard key

获取指定的有序集合的成员**数**

```bash
127.0.0.1:6379> Zcard zLeft
(integer) 10
127.0.0.1:6379> Zrange zLeft 0 -1
 1) "A"
 2) "a"
 3) "b"
 4) "C"
 5) "c"
 6) "d"
 7) "e"
 8) "f"
 9) "G"
10) "g"
```

> Zcount key min max

* 计算有序集合中指定**分数区间**的成员数量
* 返回给定分数区间的分数的数量

```bash
127.0.0.1:6379> Zadd zScore 1 a
(integer) 1
127.0.0.1:6379> Zadd zScore 2 b 2 B
(integer) 2
127.0.0.1:6379> Zadd zScore 2.55 bee 2.5 be
(integer) 2
127.0.0.1:6379> Zadd zScore 3.1 FFFFF
(integer) 1
127.0.0.1:6379> Zrange zScore 0 -1
1) "a"
2) "B"
3) "b"
4) "be"
5) "bee"
6) "FFFFF"
127.0.0.1:6379> zCount zScore 1 3
(integer) 5
```


> ZincrBy key 

指定key的成员增加分数，增加的量为increment,返回增加后的score

```bash
127.0.0.1:6379> zAdd myset 1 a 2 b 3 c
(integer) 3
127.0.0.1:6379> zrange myset 0 -1
1) "a"
2) "b"
3) "c"
127.0.0.1:6379> zIncrBy myset 3 a
"4"
127.0.0.1:6379> zRange myset 0 -1
1) "b"
2) "c"
3) "a"
```

> ZinterStore destination

```bash
# 新建有序左集合
127.0.0.1:6379> zAdd zLeft 10 a 20 b 30 c 40 d
(integer) 4
# 新建有序右集合
127.0.0.1:6379> zAdd zRight 20 a 30 b 40 c
(integer) 3
127.0.0.1:6379> zRange zLeft 0 -1 withscores
1) "a"
2) "10"
3) "b"
4) "20"
5) "c"
6) "30"
7) "d"
8) "40"
127.0.0.1:6379> zRange zRight 0 -1 withscores
1) "a"
2) "20"
3) "b"
4) "30"
5) "c"
6) "40"
# 计算交集
127.0.0.1:6379> zInterStore zInter 2 zLeft zRight
(integer) 3
127.0.0.1:6379> zRange zInter 0 -1 withScores
1) "a"
2) "30"
3) "b"
4) "50"
5) "c"
6) "70"
```



> ZlexCount

* 在有序集合中计算指定字典区间内成员数量
* 返回区间指定的成员数

```bash
127.0.0.1:6379> zAdd zleft 0 a 0 b 
(integer) 2
127.0.0.1:6379> zAdd zleft 0 c 0 d 0 e 0 f
(integer) 4
127.0.0.1:6379> zRange zleft 0 -1 withscores
 1) "a"
 2) "0"
 3) "b"
 4) "0"
 5) "c"
 6) "0"
 7) "d"
 8) "0"
 9) "e"
10) "0"
11) "f"
12) "0"
127.0.0.1:6379> zlexCount zleft - +
(integer) 6
127.0.0.1:6379> zLexCount zleft [d [f
(integer) 3
```

> Zrange

* 返回有序集合的指定区间的成员

```bash
127.0.0.1:6379> zAdd zMyset 0 a 1 b 3 d 2 c
(integer) 4
127.0.0.1:6379> zRange zMyset 0 -1
1) "a"
2) "b"
3) "c"
4) "d"
127.0.0.1:6379> zRange zMyset 0 -1 withscores
1) "a"
2) "0"
3) "b"
4) "1"
5) "c"
6) "2"
7) "d"
8) "3"
```

> ZrangeByLex key 

* 通过字典区间返回有序集合的成员

```bash
127.0.0.1:6379> zRange myset 0 -1 withscores
 1) "a"
 2) "0"
 3) "b"
 4) "1"
 5) "AB"
 6) "1.1100000000000001"
 7) "c"
 8) "2"
 9) "d"
10) "3"
11) "e"
12) "4"
#按字典序获取成员，列出包含b 到 包含 [d之间的成员
127.0.0.1:6379> zRangeBylex myset [b [d
1) "b"
2) "AB"
3) "c"
4) "d"
#按字典序获取成员，按升序列出有序集合的成员
127.0.0.1:6379> zRangeBylex myset - +
1) "a"
2) "b"
3) "AB"
4) "c"
5) "d"
6) "e"
#按字典序获取成员，从第一个成员到d,不包含d
127.0.0.1:6379> zRangeByLex myset - (d
1) "a"
2) "b"
3) "AB"
4) "c"
#按字典序获取成员，从第一个成员到c,包含c
127.0.0.1:6379> zRangeByLex myset - [c
1) "a"
2) "b"
3) "AB"
4) "c"
```

> ZrangeByScore

* 按分数罗列区间的成员

```bash
127.0.0.1:6379> zAdd myzset 0 a 1 b 2 c 3 d 
(integer) 4
127.0.0.1:6379> zAdd myzset 1.22 BB 2.95 CC 3.01 DD
(integer) 3
127.0.0.1:6379> zRange myzset 0 -1 withscores
 1) "a"
 2) "0"
 3) "b"
 4) "1"
 5) "BB"
 6) "1.22"
 7) "c"
 8) "2"
 9) "CC"
10) "2.9500000000000002"
11) "d"
12) "3"
13) "DD"
14) "3.0099999999999998"
127.0.0.1:6379> zRange myzset 1 3
1) "b"
2) "BB"
3) "c"
127.0.0.1:6379> zRangeByScore myzset 1 3
1) "b"
2) "BB"
3) "c"
4) "CC"
5) "d"
127.0.0.1:6379> zRange myzset 1 3 withscores
1) "b"
2) "1"
3) "BB"
4) "1.22"
5) "c"
6) "2"
127.0.0.1:6379> zRangeByScore myzset 1 3 withscores
 1) "b"
 2) "1"
 3) "BB"
 4) "1.22"
 5) "c"
 6) "2"
 7) "CC"
 8) "2.9500000000000002"
 9) "d"
10) "3"
```

> Zrank

* 查看指定成员在有序集合中的排名
* 排名成0开始
* 成员不在有序集合中，则返回nil

```bash
127.0.0.1:6379> zRange myzset 0 -1 withscores
 1) "a"
 2) "0"
 3) "b"
 4) "1"
 5) "BB"
 6) "1.22"
 7) "c"
 8) "2"
 9) "CC"
10) "2.9500000000000002"
11) "d"
12) "3"
13) "DD"
14) "3.0099999999999998"
127.0.0.1:6379> zRange myzset 0 -1
1) "a"
2) "b"
3) "BB"
4) "c"
5) "CC"
6) "d"
7) "DD"
127.0.0.1:6379> zrank myzset BB
(integer) 2 # BB在排行榜第二
127.0.0.1:6379> zrank myzset c
(integer) 3 # c在排行榜第三
127.0.0.1:6379> zrank myzset BBB
(nil)
```

> Zrem key member [member ...]

* 在指定有序集合中移除一个或多个成员
* 返回移除的成员个数

```bash
127.0.0.1:6379> zrange myzset 0 -1
1) "a"
2) "b"
3) "BB"
4) "c"
5) "CC"
6) "d"
7) "DD"
127.0.0.1:6379> zrem myzset b
(integer) 1
127.0.0.1:6379> zrange myzset 0 -1
1) "a"
2) "BB"
3) "c"
4) "CC"
5) "d"
6) "DD"
127.0.0.1:6379> zrem myzset d c
(integer) 2
127.0.0.1:6379> zrange myzset 0 -1
1) "a"
2) "BB"
3) "CC"
4) "DD"
```

> ZremRangeLex

* 按**字典序**删除有序集合区间内的成员

```bash
127.0.0.1:6379> zrangeBylex lexset - +
1) "a"
2) "b"
3) "c"
4) "d"
5) "e"
6) "f"
7) "g"
# 删除字典序的有序集合的区间内的成员
127.0.0.1:6379> zRemRangeByLex lexset [c [e
(integer) 3 # 返回删除的个数
127.0.0.1:6379> zRangeByLex lexset - +
1) "a"
2) "b"
3) "f"
4) "g"
```

> ZremRangeByScore key min max

* 按照**分数**删除有序集合的区间
* 返回删除的个数

```bash
127.0.0.1:6379> zAdd myscoreset 0 a 1 b 2 c 3 d
(integer) 4
127.0.0.1:6379> zAdd myscoreset 2.1 CC 1.99 BB
(integer) 2
127.0.0.1:6379> zrange myscoreset 0 -1 withscores
 1) "a"
 2) "0"
 3) "b"
 4) "1"
 5) "BB"
 6) "1.99"
 7) "c"
 8) "2"
 9) "CC"
10) "2.1000000000000001"
11) "d"
12) "3"
# 删除序号1 ~ 2的
127.0.0.1:6379> zRemRangeByScore myscoreset 1 2
(integer) 3 # 返回删除的个数
127.0.0.1:6379> zrange myscoreset 0 -1 withscores
1) "a"
2) "0"
3) "CC"
4) "2.1000000000000001"
5) "d"
6) "3"
```


> ZrevRange

* 按分数降序返回有序集合
* 相同分数值的成员按字典序的逆序排列
* 与zRange排序方式相反

```bash
# 升序列出指定有序集合的所有成员
127.0.0.1:6379> zrange myscoreset 0 -1 withscores
1) "a"
2) "0"
3) "CC"
4) "2.1000000000000001"
5) "d"
6) "3"
# 降序列出当前有序集合所有的成员
127.0.0.1:6379> zRevRange myscoreset 0 -1 withscores
1) "d"
2) "3"
3) "CC"
4) "2.1000000000000001"
5) "a"
6) "0"
```

> ZrevRangeByScore key max min [withscores]

* 返回有序集合指定区间内的成员，按分数降序

```bash
127.0.0.1:6379> zrevRangeByScore myscoreset - + 
(error) ERR min or max is not a float
127.0.0.1:6379> zrevRangeByScore myscoreset +inf -inf 
1) "d"
2) "CC"
3) "a"
127.0.0.1:6379> zrevRangeByScore myscoreset +inf -inf withscores
1) "d"
2) "3"
3) "CC"
4) "2.1000000000000001"
5) "a"
6) "0"
127.0.0.1:6379> zrevRangeByScore myscoreset 2 0 withscores
1) "a"
2) "0"
127.0.0.1:6379> zrevRangeByScore myscoreset 3 2 withscores
1) "d"
2) "3"
3) "CC"
4) "2.1000000000000001"
```

> ZrevRank

* 有序集成员按分数值递减(从大到小)排序。
* 分数值最大的成员排名为 0
* 相比较于zrank，获得到的是最小到大的排序

```bash
127.0.0.1:6379> zAdd asw 1000 a 2000 b 3000 c 
(integer) 3
127.0.0.1:6379> zadd asw 4000 d 5000 e
(integer) 2
127.0.0.1:6379> zrevRange asw 0 -1 withscores
 1) "e"
 2) "5000"
 3) "d"
 4) "4000"
 5) "c"
 6) "3000"
 7) "b"
 8) "2000"
 9) "a"
10) "1000"
# 查看a的排名
127.0.0.1:6379> zRevRank asw a
(integer) 4
# 查看e的排名
127.0.0.1:6379> zRevRank asw e
(integer) 0
```

> Zscore key member

* 查看指定成员在有序集合中的分数

```
127.0.0.1:6379> zrange asw 0 -1 withscores
 1) "a"
 2) "1000"
 3) "b"
 4) "2000"
 5) "c"
 6) "3000"
 7) "d"
 8) "4000"
 9) "e"
10) "5000"
127.0.0.1:6379> zscore asw c
"3000"
```

> ZunionStore destination key1 key2

* 返回一/多个有序集合中的并集，并存在指定的集合中

```bash
127.0.0.1:6379> zadd left 1 a 2 b 3 c 4 d
(integer) 4
127.0.0.1:6379> zAdd right 3 c 4 d 5 e 6 f
(integer) 4
127.0.0.1:6379> zunionstore myunion 2 left right
(integer) 6
127.0.0.1:6379> zrange myunion 0 -1 withscores
 1) "a"
 2) "1"
 3) "b"
 4) "2"
 5) "e"
 6) "5"
 7) "c"
 8) "6"
 9) "f"
10) "6"
11) "d"
12) "8"
```

> Zscan

* 迭代有序集合

```
127.0.0.1:6379> zAdd websit 1 taobao 2 baidu 3 alibaba 4 tianmao 5 douyu 6 bilibili
(integer) 6
127.0.0.1:6379> zrange websit 0 -1 withscores
 1) "taobao"
 2) "1"
 3) "baidu"
 4) "2"
 5) "alibaba"
 6) "3"
 7) "tianmao"
 8) "4"
 9) "douyu"
10) "5"
11) "bilibili"
12) "6"
127.0.0.1:6379> zscan websit 0 match "*d*"
1) "0"
2) 1) "baidu"
   2) "2"
   3) "douyu"
   4) "5"
```

## GEO 地理位置

> geoadd key longitute latitude member [longitute latitude member ...]

* 添加地理位置

```bash
# 添加广州到城市的集合，经度113.265 纬度23.108
127.0.0.1:6379> geoadd city 113.265 23.108 guangzhou
(integer) 1
127.0.0.1:6379> geoadd city 108.295 22.838 nanning
(integer) 1
127.0.0.1:6379> geoadd city 116.408 39.904 beijing
(integer) 1
127.0.0.1:6379> geoadd city 114.279 30.573 wuhan
(integer) 1
127.0.0.1:6379> geoadd city 106.549 29.581 chongqing 121.445 31.213 shanghai
(integer) 2
```

> geopos key member [member ...]

* 通过指定位置名称查询对应的经度

```bash
127.0.0.1:6379> geopos city guangzhou
1) 1) "113.26500087976455688"
   2) "23.10799963305151294"
```

geodist key member1 member2 [m|km|mi|ft]

* 查询两个位置的距离
* m：米(默认)
* km：千米
* mi：英里
* ft：英尺

```
127.0.0.1:6379> geodist city guangzhou nanning km
"509.8121"
127.0.0.1:6379> geodist city nanning beijing km
"2046.2488"
```

> geoRadius key longirude latitude radius [m|km|ft|mi] [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [STORE key] [STOREDIST key]

* 根据经度纬度查找距离当前

```bash
127.0.0.1:6379> georadius city 110 33 500 km
1) "wuhan"
127.0.0.1:6379> georadius city 120 43 1000 km
1) "beijing"
```

> geoRadiusBymember key longirude latitude radius [m|km|ft|mi] [withcoord] [withdist] [withhash] [COUNT count] [asc|desc] [STORE key] [STOREDIST key]

* 根据位置名称，查找指定半径内的成员

```bash
127.0.0.1:6379> georadiusByMember city wuhan 1000 km withcoord withdist
1) 1) "guangzhou"
   2) "836.3652"
   3) 1) "113.26500087976455688"
      2) "23.10799963305151294"
2) 1) "wuhan"
   2) "0.0000"
   3) 1) "114.27899926900863647"
      2) "30.57299931525717795"
3) 1) "shanghai"
   2) "687.5385"
   3) 1) "121.44499808549880981"
      2) "31.213001199663303"
4) 1) "chongqing"
   2) "751.9902"
   3) 1) "106.54900163412094116"
      2) "29.58100070345364685"
127.0.0.1:6379> georadiusByMember city wuhan 1000 km withcoord withdist count 2
1) 1) "wuhan"
   2) "0.0000"
   3) 1) "114.27899926900863647"
      2) "30.57299931525717795"
2) 1) "shanghai"
   2) "687.5385"
   3) 1) "121.44499808549880981"
      2) "31.213001199663303"
```

### 集合的命令操作geo

* 因为GOE底层是由set封装而成的

```bash
127.0.0.1:6379> type city
zset
```

> 查看所有的地理位置
```bash
 1) "nanning"
 2) "4022430512005386"
 3) "chongqing"
 4) "4026059444815603"
 5) "guangzhou"
 6) "4046533668848872"
 7) "wuhan"
 8) "4052121270844835"
 9) "shanghai"
10) "4054756185507317"
11) "beijing"
12) "4069885369376452"
```

> 移除位置信息

```bash
127.0.0.1:6379> zrange city 0 -1 withscores
 1) "nanning"
 2) "4022430512005386"
 3) "chongqing"
 4) "4026059444815603"
 5) "guangzhou"
 6) "4046533668848872"
 7) "wuhan"
 8) "4052121270844835"
 9) "shanghai"
10) "4054756185507317"
11) "beijing"
12) "4069885369376452"
127.0.0.1:6379> zrem city nanning
(integer) 1
127.0.0.1:6379> zrem city wuhan
(integer) 1
127.0.0.1:6379> zrange city 0 -1 withscores
1) "chongqing"
2) "4026059444815603"
3) "guangzhou"
4) "4046533668848872"
5) "shanghai"
6) "4054756185507317"
7) "beijing"
8) "4069885369376452"
```

> geohash city member [member ...]

* 将二维的经度纬度转换成一维的字符串
* 两个字符串越相似，地理位置就越近

```bash
127.0.0.1:6379> geohash city chongqing guangzhou
1) "wm7b2949gd0"
2) "ws0e3qtjcg0"
```


## hyperloglog

```bash
127.0.0.1:6379> type news3
string
```

* 用来做基数统计的算法

* 优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。

* 当数据很庞大的时候，会有误差

* 如果做谋篇文章的浏览总数，视频观看总数的

> PFadd key element

* 添加元素

```bash
127.0.0.1:6379> PFadd news a b c d e f g h i
(integer) 1
127.0.0.1:6379> PFadd news2 c d r l a g j k
(integer) 1
```

> PFcount key

* 查看基数

```
127.0.0.1:6379> PFcount news
(integer) 9
127.0.0.1:6379> PFcount news2
(integer) 8
```

> PFmerge distan sourcekey [sourcekey ]

* 将一/多个的hyperloglog合并到目标的hyperloglog中

```bash
127.0.0.1:6379> PFmerge news3 news2 news
OK
127.0.0.1:6379> PFcount news3
(integer) 13
```

