# 数据库的常见操作命令
## 查看数据库
```
mysql> show databases;
```

## 使用某个数据库
```
mysql> use text;
```

## 查看当前数据库的表格
```
mysql> show tables;
```

## 查看某个数据库的表格
```
show tables from text
```
## 创建表格
```
mysql> create table studinfo(
    -> id int,
    -> name varchar(20)
    -> );

```

## 查看表格描述
```
mysql> desc studinfo;
```

## 查看数据库版本
```
mysql> select version();
```

