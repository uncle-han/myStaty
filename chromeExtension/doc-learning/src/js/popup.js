chrome.browserAction.onClicked.addListener(function(tab) {
    alert('tab', tab)
})

const browserAction_setNewIcon = document.getElementById('browserAction_setNewIcon')
browserAction_setNewIcon.addEventListener('click', function() {
    // const canvas = document.createElement('canvas');
    // const ctx = canvas.getContext('2d');
    // const icon = document.getElementById('icon')
    // ctx.drawImage(icon, 0, 0)
    // chrome.browserAction.setIcon({
    //     imageData: icon
    // })
})

// 修改toolTip
const browserAction_modifyToolTip = document.getElementById('browserAction_modifyToolTip')
browserAction_modifyToolTip.addEventListener('click', function() {
    const toolTip = prompt('输入toolTips', Date.now())
    chrome.browserAction.setTitle({title: toolTip})
})


// 显示badge
const browserAction_displayBadge = document.getElementById('browserAction_displayBadge')
browserAction_displayBadge.addEventListener('click', function() {
    chrome.browserAction.setBadgeBackgroundColor({color: [255, 0, 0, 255]});
    chrome.browserAction.setBadgeText({text: '显示badge'});
})

// 隐藏badge
const browserAction_hiddenBadge = document.getElementById('browserAction_hiddenBadge')
browserAction_hiddenBadge.addEventListener('click', function() {
    chrome.browserAction.setBadgeBackgroundColor({color: [0, 0, 0, 0]});
    chrome.browserAction.setBadgeText({text: ''});
})


const browserAction_hiddenPopup = document.getElementById('browserAction_hiddenPopup')
browserAction_hiddenPopup.addEventListener('click', () => {
    chrome.browserAction.setPopup({
        popup: ''
    })
})

// 打开后台页
const openBackgroundPgae = document.getElementById('openBackgroundPgae');

openBackgroundPgae.addEventListener('click', () => {
    // const pageUrl = chrome.extension.getURL('../../src/backgroundPage.html');
    // window.open(pageUrl)
    window.open('../../src/backgroundPage.html') // 这段代码也可以打开后台页
})

// 设置后台页标题
const setBackgroundTitle = document.getElementById('setBackgroundTitle');

setBackgroundTitle.addEventListener('click', () => {
    const bgp = chrome.extension.getBackgroundPage();
    const title = prompt('请输入标题~~', '777')
    bgp.document.title = title;
})

// 获取后台页标题
const getBackgroundTitle = document.getElementById('getBackgroundTitle');

getBackgroundTitle.addEventListener('click', () => {
    const bgp = chrome.extension.getBackgroundPage();
    alert(bgp.document.title)
})

// 执行后台页js
const excuteBackgroundJs = document.getElementById('excuteBackgroundJs');

excuteBackgroundJs.addEventListener('click', () => {
    const bgp = chrome.extension.getBackgroundPage();
    
})






