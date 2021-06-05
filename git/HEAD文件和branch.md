# HEAD文件和branch的关系

```bash
$ cat .git/HEAD
ref: refs/heads/master # HEAD文件保存当前分支的名称

/c/myData/myStaty/git_dome_store/git statudy (master)
$ git checkout -b fix_readme fix_css
Switched to a new branch 'fix_readme'

/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git branch
  fix_css
* fix_readme #正常切换到新分支上
  master
  temp

/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ cat .git/HEAD
ref: refs/heads/fix_readme # 改变分支之后，内容分支发生改变

/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git log -n2
commit 0ae722502ed8ba2ae6d50aac2e9cb9eef63e12d1 (HEAD -> fix_readme, fix_css)
Author: 覃淇韩 <347343944@qq.com>
Date:   Sat May 1 19:03:24 2021 +0800

    modify h1 tag color to deeppink

commit c24acaf743b7428396ed3702aa71a8a949ff0290
Author: 覃淇韩 <347343944@qq.com>
Date:   Wed Apr 28 19:30:40 2021 +0800

    import css

/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ cat .git/refs/heads/fix_readme # 当前分支定义的文件
0ae722502ed8ba2ae6d50aac2e9cb9eef63e12d1

/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git cat-file -t 0ae722502ed8ba2ae6d50aac2e9cb9eef63e12d1 # 检查定义的文件的文件类型，与之前git log第一个commit相同
commit
```
* **branch归根一个commit**
* **HEAD一个branch**
* **HEAD归根是一个commit**

> diff的用法

```bash
/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git log -n3
commit 0ae722502ed8ba2ae6d50aac2e9cb9eef63e12d1 (HEAD -> fix_readme, fix_css)
Author: 覃淇韩 <347343944@qq.com>
Date:   Sat May 1 19:03:24 2021 +0800

    modify h1 tag color to deeppink

commit c24acaf743b7428396ed3702aa71a8a949ff0290
Author: 覃淇韩 <347343944@qq.com>
Date:   Wed Apr 28 19:30:40 2021 +0800

    import css

commit 51edf636a7f137bef5dcb4dd6a18d96b02972415
Author: 覃淇韩 <347343944@qq.com>
Date:   Wed Apr 28 19:29:57 2021 +0800

    add css fole

/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git diff 0ae722502ed8b c24acaf743b7428396
diff --git a/css.css b/css.css
index 16ab190..49eb438 100644
--- a/css.css
+++ b/css.css
@@ -1,6 +1,3 @@
 html {
     background-color: #1d78f4;
-}
-h1 {
-    color: deeppink;
 }
\ No newline at end of file

/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git diff 0ae722502ed8ba2 HEAD^
diff --git a/css.css b/css.css
index 16ab190..49eb438 100644
--- a/css.css
+++ b/css.css
@@ -1,6 +1,3 @@
 html {
     background-color: #1d78f4;
-}
-h1 {
-    color: deeppink;
 }
\ No newline at end of file

/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git diff 0ae722502ed8ba2 HEAD~1 # commit 和 HEAD前面一个commit 用HEAD快速指代
diff --git a/css.css b/css.css
index 16ab190..49eb438 100644
--- a/css.css
+++ b/css.css
@@ -1,6 +1,3 @@
 html {
     background-color: #1d78f4;
-}
-h1 {
-    color: deeppink;
 }
\ No newline at end of file

```


