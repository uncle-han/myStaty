# 拉取镜像

```bash
docker pull nginx
```

# 启动容器

```bash
docker run -d -p 8000:80 --privileged --name nginx-web -v /dockerWork/nginx/html:/usr/share/nginx/html -v /dockerWork/nginx/conf/:/etc/nginx/ -v /dockerWork/nginx/logs/:/var/log/nginx/ -v /dockerWork/nginx/conf.d/:/etc/nginx/conf.d/ nginx:1.11.3
```

```bash
docker run -d -p 8000:80 -v /dockerWork/nginx/conf/:/etc/nginx/ nginx:1.11.3
```



# 将容器的配置文件复制到本地

```bash
docker cp 容器id:/etc/nginx/nginx.conf /root/nginx/conf
```

# 日志在的目录

```bash
/var/log/nginx/error.log
/var/log/nginx/access.log
```

# html所在目录

```bash
/usr/share/nginx/html
```

# 主配置文件所在目录

```bash
/etc/nginx/nginx.conf
```

# server 配置文件

```bash
/etc/nginx/conf.d/default.conf
```

