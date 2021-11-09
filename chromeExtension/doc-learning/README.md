# 谷歌插件学习

## 后台页

* 在`manifest.json`配置后台页的路径
```json
{
  "manifest_version": 2,
  // 省略其他配置，以下是主要的配置项
  "background": {
    "page": "src/backgroundPage.html"
  }
}
```

* `src/backgroundPage.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>background page</title>
</head>

<body>
    <h1>我是后台页</h1>
</body>

</html>
```

> 开发后台页

* `/src/js/popup.js`
```js
const openBackgroundPgae = document.getElementById('openBackgroundPgae');
openBackgroundPgae.addEventListener('click', () => {
    const pageUrl = chrome.extension.getURL('../../src/backgroundPage.html');
    window.open(pageUrl)
    // window.open('../../src/backgroundPage.html') // 这段代码也可以打开后台页
})
```

> 设置后台页标题

* `/src/js/popup.js`

```js
// 设置后台页标题
const setBackgroundTitle = document.getElementById('setBackgroundTitle');

setBackgroundTitle.addEventListener('click', () => {
    const bgp = chrome.extension.getBackgroundPage();
    const title = prompt('请输入标题~~', '777')
    bgp.document.title = title;
})
```

> 获取后台页标题

* `/src/js/popup.js`

```js
// 获取后台页标题
const getBackgroundTitle = document.getElementById('getBackgroundTitle');

getBackgroundTitle.addEventListener('click', () => {
    const bgp = chrome.extension.getBackgroundPage();
    alert(bgp.document.title)
})
```

> 执行后台页js代码

* 因为在插件里面，需要**跨域**到其他网站去执行代码，所以需要在`manifest.json`里面配置权限

```json
{
  "manifest_version": 2,
  // 省略其他配置，以下是主要的配置项
  "background": {
    "page": "src/backgroundPage.html"
  }
}
```

