// 定义数组的方式一
type arr = {
    readonly [key: number]: number
}

interface arr2 {
    key1: Array<arr>
}

const arr12:arr2 = {
    key1: []
}

// arr12.key1 = [123]

let a: arr = [1, 2, 3]

// 定义数组的方式二
let b: number[] = [1,2,3]

// 定义数组的方式三

let c: Array<number | string> = [1,2,3, '4']


// 对象的定义
let d : {
    [key: string]: number | string
} | {
    [key: number]: number | string
}

d = [123, '123']
d = {a: 123}

interface ObjType {
    readonly name: string,
    [key: string]: any
}

const e: ObjType = {
    name: 'qqh',
    haode: 1,
}

const fn: ( n1: number, ...resetArgu: number[] ) => number = (n, ...resetP) => Math.max.apply(Math, [n, ...resetP])

interface fn2 {
    click(oncli:(this: void) => void): void 
}

const div:HTMLDivElement = document.querySelector('div') as HTMLDivElement;

interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}


function f1 (x: number) : number[]
function f1 (x: string) :  string
function f1(x): number[] | string {
    if (typeof x === 'string') {
        return x
    } else {
        return [x]
    }
}

f1('1')

const f2: <T>(x:T) => void = <T>(x:T) => {
    console.log(x)
}

f2<number>(1)
f2<string>('1')

function f3<T>(x:T):void {
    console.log(x)
}



