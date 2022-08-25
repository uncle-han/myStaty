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

* 具体的配置信息

```bash
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```

# server 配置文件

```bash
/etc/nginx/conf.d/default.conf
```

* 具体的配置信息

```bash
server {
    listen       80;
    server_name  localhost;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}
```


