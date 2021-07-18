# 关闭不必要的系统项
1. 关闭防火墙
为了可以访问所有的端口号
```bash
systemctl stop firewalld.service 
```

2. 
让防火墙开机启动，防止重复设置
```bash
systemctl disable firewalld.service
```

3. 关闭`selinux`

```bash
vi /etc/sysconfig/selinux
```

4. 找到selinux的配置文件，以下为修改的内容

```bash
SELINUX=disabled # 将 enforcing 改成 disabled
```

5. 重启
使禁用的selinux生效

```bash
reboot
```

# 下载gitLab的依赖包

6. 查看selinux是否禁用成功，查看getenforce，是否返回Disabled

```bash
[root@localhost ~]# getenforce
Disabled
```

7. 安装依赖

```bash
yum -y install curl policycoreutils openssh-server openssh-clients postfixs
```

8. 安装gitlab

```bash
curl -sS https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.rpm.sh | sudo bash
```

9. 开启`postfix`邮箱,并设置为开机启动

```bash
systemctl start postfix
systemctl enable postfix
```

10. 安装安装社区版gitlab-ce

```
yum install -y gitlab-ce
```


