# 安装mysql
## 查看是否有要pull的镜像
```
docker search mysql
```
## 拉取镜像 
```
docker pull mysql
```
可以在镜像后面跟上版本号，如mysql:5.3

## 查看镜像是否下载成功
```
docker images mysql
```

## 运行镜像
```
docker run -p 3306:3306 --name sutdymysql -v /dockerWork/mysql/conf/mysql.conf:/etc/mysql/conf.d -v /dockerWork/mysql/logs/mysqllogs:/logs -v /dockerWork/mysql/data/mysqldata:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=root -d mysql
```
* -d 后台启动
* -p 3306:3306
    * 主机上的3306端口号对应docker容器的3306mysql数据库的端口号
* --name sutdymysql
    * 生成的容器名称：sutdymysql
* 指定volume
    * /mydocker/conf/mysql.conf:/etc/mysql/conf.d
    * /mydocker/logs/mysqllogs:/logs
    * /mydocker/data/mysqldata:/var/lib/mysql
* MYSQL_ROOT_PASSWORD=root
    * 指定root用户登录的密码为：root

***此时，用navicat for mysql连接mysql发现报错：Client does not support authentication protocol requested  by server。。。***
解决方案：
进入容器：
```
docker exec -it 62349aa31687 /bin/bash
```

进入mysql：
```
mysql -u root -p
```
授权：
```
mysql> GRANT ALL ON *.* TO 'root'@'%';
```
刷新权限
```
mysql> flush privileges;
```
更新加密规则
```
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
```
更新root用户密码：
```
mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```
刷新权限：
```
mysql> flush privileges;
```

