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


## list 类型


