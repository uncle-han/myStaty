"use strict";
const arr12 = {
    key1: []
};
// arr12.key1 = [123]
let a = [1, 2, 3];
// 定义数组的方式二
let b = [1, 2, 3];
// 定义数组的方式三
let c = [1, 2, 3, '4'];
// 对象的定义
let d;
d = [123, '123'];
d = { a: 123 };
const e = {
    name: 'qqh',
    haode: 1,
};
const fn = (n, ...resetP) => Math.max.apply(Math, [n, ...resetP]);
const div = document.querySelector('div');
function f1(x) {
    if (typeof x === 'string') {
        return x;
    }
    else {
        return [x];
    }
}
f1('1');
const f2 = (x) => {
    console.log(x);
};
f2(1);
f2('1');
function f3(x) {
    console.log(x);
}
