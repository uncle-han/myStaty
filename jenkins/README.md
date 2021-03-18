# jenkins

## 全局变量
> ${WORKSPACE}

* 输出当前执行job的路径

```bash
echo ${WORKSPACE} # /var/lib/jenkins/workspace/studyJenkins
```

## jenkins 自带的指令

> Jenkins启动/重启(mac)

sudo launchctl load /Library/LaunchDaemons/org.jenkins-ci.plist
如果Jenkins通过托管在Tomcat下，那么直接启动/重启Tomcat服务即可

> Jenkins停止

sudo launchctl unload /Library/LaunchDaemons/org.jenkins-ci.plist
如果Jenkins通过托管在Tomcat下，那么直接停止Tomcat服务即可

> Jenkins启动/重启(ubuntu)

sudo/etc/init.d/jenkins start
sudo/etc/init.d/jenkins stop






