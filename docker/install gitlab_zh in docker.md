# 安装gitlab

## 拉取镜像
这里拉取的中文版镜像
```
docker pull gitlab/gitlab-ce
```

运行镜像
```
docker run -d  -p 443:443 -p 80:80 -p 222:22 --name myGitlab --restart always -v /home/gitlab/config:/etc/gitlab -v /home/gitlab/logs:/var/log/gitlab -v /home/gitlab/data:/var/opt/gitlab gitlab/gitlab-ce
```

## 配置 
按上面的方式，gitlab容器运行没问题，但在gitlab上创建项目的时候，生成项目的URL访问地址是按容器的hostname来生成的，也就是容器的id。作为gitlab服务器，我们需要一个固定的URL访问地址，于是需要配置gitlab.rb（宿主机路径：/home/gitlab/config/gitlab.rb）。

```
# gitlab.rb文件内容默认全是注释
$ vim /home/gitlab/config/gitlab.rb
```
填入一下信息
```
# 配置http协议所使用的访问地址,不加端口号默认为80
external_url 'http://192.168.199.231'

# 配置ssh协议所使用的访问地址和端口
gitlab_rails['gitlab_ssh_host'] = '192.168.199.231'
# 此端口是run时22端口映射的222端口
gitlab_rails['gitlab_shell_ssh_port'] = 222 
```