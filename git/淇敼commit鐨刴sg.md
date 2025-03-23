# 修改当前分支的最新的commit 的msg
* `git commit --amend`
* 重命名的commit的hash发生变化

```bash
/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git log -n1
commit 97056775cacdef5c9ae7b0c0102d08d783e27715 (HEAD -> fix_readme)
Author: 覃淇韩 <347343944@qq.com>
Date:   Sat May 1 19:03:24 2021 +0800

    modify h1 tag color to deeppink
/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git commit --amend
[fix_readme a5c23e1] add color to deeppink style to h1 tag
 Date: Sat May 1 19:03:24 2021 +0800
 1 file changed, 3 insertions(+)
/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git log -n1
commit a5c23e188cdf3e132e9d99a917f5c3afa3378ff6 (HEAD -> fix_readme)
Author: 覃淇韩 <347343944@qq.com>
Date:   Sat May 1 19:03:24 2021 +0800

    add color to deeppink style to h1 tag

```

# 修改当前分支的第N个commit 的msg
* `git rebase -i (n+1 commit hase)`
* 查看当前日志
```bash
/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git log -n4 --graph
* commit 0ae722502ed8ba2ae6d50aac2e9cb9eef63e12d1 (HEAD -> fix_readme, fix_css)
| Author: 覃淇韩 <347343944@qq.com>
| Date:   Sat May 1 19:03:24 2021 +0800
|
|     modify h1 tag color to deeppink
|
* commit c24acaf743b7428396ed3702aa71a8a949ff0290
| Author: 覃淇韩 <347343944@qq.com>
| Date:   Wed Apr 28 19:30:40 2021 +0800
|
|     import css
|
* commit 51edf636a7f137bef5dcb4dd6a18d96b02972415
| Author: 覃淇韩 <347343944@qq.com>
| Date:   Wed Apr 28 19:29:57 2021 +0800
|
|     add css fole
|
* commit 72a3af2d93dc8b003b0af8ca0ab063b3b55637b9
  Author: 覃淇韩 <347343944@qq.com>
  Date:   Wed Apr 28 19:28:47 2021 +0800

      add html template
```

* 修改第三个commit的msg，commit的hash值是51edf636a7f137bef5dc

```bash
/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git rebase -i 72a3af2d93dc8b003b0af8c # 变基的起始commit id，选定为要变基的后面commit id
[detached HEAD a127520] add css file
 Date: Wed Apr 28 19:29:57 2021 +0800
 1 file changed, 3 insertions(+)
 create mode 100644 css.css
Successfully rebased and updated refs/heads/fix_readme.
```

* 变基之后的log
    *  要重命名的commit，本身和前面的commit id都被刷新成其他了
```
/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git status
On branch fix_readme
nothing to commit, working tree clean

/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git log
commit 97056775cacdef5c9ae7b0c0102d08d783e27715 (HEAD -> fix_readme)
Author: 覃淇韩 <347343944@qq.com>
Date:   Sat May 1 19:03:24 2021 +0800

    modify h1 tag color to deeppink

commit 789037b1df131437b6160f844762a8f9a50435ae
Author: 覃淇韩 <347343944@qq.com>
Date:   Wed Apr 28 19:30:40 2021 +0800

    import css

commit a127520d1f7cce89dcdc6124c3fff2a4e0762e8e
Author: 覃淇韩 <347343944@qq.com>
Date:   Wed Apr 28 19:29:57 2021 +0800

    add css file

commit 72a3af2d93dc8b003b0af8ca0ab063b3b55637b9
Author: 覃淇韩 <347343944@qq.com>
Date:   Wed Apr 28 19:28:47 2021 +0800

    add html template
```




