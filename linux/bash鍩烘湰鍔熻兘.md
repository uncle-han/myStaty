# history

1. 查看输入过的历史命令
2. `↑`和`↓`的方向键就是history命令的实现

* 所有用过的命令，保存在`~/.bash_history`下面
* history -w 
    * `history -w`运行之前，所有的命令保存在内存，等用户退出了，才把用过的命令，保存到`~/.bash_history`下面
    * `history -w`运行之后，每一次命令执行之后，就把命令保存到`~/.bash_history`下面
* history -c 
    * 删除之前所有的命令的历史记录



```bash
[root@localhost ~]# history -c 
[root@localhost ~]# vi ~/.bash_history 
[root@localhost ~]# history
    1  vi ~/.bash_history 
    2  history

```

<img src="./img/2.png" /> 



