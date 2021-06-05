# HEAD和暂存区的diff

* `git diff HEAD --cached`

```bash
/c/myData/myStaty/git_dome_store/git statudy (fix_css)
$ git add .

/c/myData/myStaty/git_dome_store/git statudy (fix_css)
$ git status
On branch fix_css
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   1.html


/c/myData/myStaty/git_dome_store/git statudy (fix_css)
$ git diff HEAD --cached 
diff --git a/1.html b/1.html
index b8d52fa..d26fa18 100644
--- a/1.html
+++ b/1.html
@@ -4,7 +4,7 @@
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
-    <title>Document</title>
+    <title>learning git</title>
     <link rel="stylesheet" href="./css.css">
 </head>
:...skipping...
diff --git a/1.html b/1.html
index b8d52fa..d26fa18 100644
--- a/1.html
+++ b/1.html
@@ -4,7 +4,7 @@
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
-    <title>Document</title>
+    <title>learning git</title>
     <link rel="stylesheet" href="./css.css">
 </head>
 <body>
```

* `git diff --cached`

```bash
/c/myData/myStaty/git_dome_store/git statudy (fix_readme)
$ git diff --cached
diff --git a/1.html b/1.html
index b8d52fa..d26fa18 100644
--- a/1.html
+++ b/1.html
@@ -4,7 +4,7 @@
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
-    <title>Document</title>
+    <title>learning git</title>
     <link rel="stylesheet" href="./css.css">
 </head>
 <body>
```


# 暂存区和工作区的比较
需求场景
* 修改html文件并提交到暂存区
* 修改css文件，不提交到暂存区

```bash
qinqihan@DESKTOP-655T6UR MINGW64 /c/myData/myStaty/git_dome_store/git statudy (fix_css)
$ git status
On branch fix_css
Changes to be committed:
  (use "git restore --staged <file>..." to unstage)
        modified:   1.html # html添加进暂存区

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   css.css # css未添加进暂存区


qinqihan@DESKTOP-655T6UR MINGW64 /c/myData/myStaty/git_dome_store/git statudy (fix_css)
$ git diff # 不加参数，只比对工作区和暂存区的区别
diff --git a/css.css b/css.css
index 16ab190..0a1d058 100644
--- a/css.css
+++ b/css.css
@@ -3,4 +3,8 @@ html {
 }
 h1 {
     color: deeppink;
+}
+
+h2 {
+    color: gold;
 }
\ No newline at end of file

qinqihan@DESKTOP-655T6UR MINGW64 /c/myData/myStaty/git_dome_store/git statudy (fix_css)
```







