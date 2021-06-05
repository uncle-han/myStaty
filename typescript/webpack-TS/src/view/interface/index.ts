interface numberObject {
    [key: string]: string | number
}

interface LabelInterface extends numberObject {
    value: string,
    
}

interface readyOnly {
    name: string,
    readonly age: number
}

interface ReadOnlyArray {
    readonly [index: number]: number
}

export default () => {
    function printLabel(label: LabelInterface): void {
        console.log(label.value);
    }
    printLabel({value: '1', age: 18})

    // 只读属性
    const my:readyOnly ={
        name: 'qqh',
        age: 18
    }

    my.name = 'qq';
    // my.age = 17; // Cannot assign to 'age' because it is a read-only property.

    const arr = [1,2,3,4]

    const  readyOnlyArry: ReadonlyArray<number> = arr

    const arrEle = readyOnlyArry[1]
    console.log(arrEle) // 2
    // readyOnlyArry.push()  //  Property 'push' does not exist on type 'readonly number[]'

    // 定义函数接口
    interface GetLenth {
        (str: string, max: number): boolean
    }

    let myfn1:GetLenth
    myfn1 = function (str: string, max: number): boolean {
        return str.length > max
    }

    interface Obj1 {
        [key: number]: number
    }

    const obj1:Obj1 = {
        65: 101
    }

    

    class Animal {
        name: string;
        constructor(name: string) {
            this.name = name
        }
    }
    class Dog extends Animal {
        breed: string;
        constructor(breed: string, name: string) {
            super(name)
            this.breed = breed
        }
    }
    
    // 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
    interface NotOkay {
        [x: number]: Animal;
        // [x: string]: Dog;
    }


    // 类类型
    interface LockInterface {
        currencyTime: Date;
        timestamp: number;
        setTime: (d: Date) => void
    }

    class Lock implements LockInterface {
        currencyTime: Date;
        timestamp: number;

        constructor(d:Date) {
            this.currencyTime = d;
            this.timestamp = d.getTime();
        }

        public setTime(d: Date) {
            this.timestamp = d.getTime();
        }

        private getTime() {
            return this.timestamp
        }

    }

    console.log('new Lock(new Date())', new Lock(new Date()))
    new Lock(new Date())

    interface BasePrototy {
        name: string;
        age: number
    }

    class Control {
        private state: any;
    }
    
    interface SelectableControl extends Control {
        select(): void;
    }
    
    class Button extends Control implements SelectableControl {
        select() { }
    }
    
    class TextBox extends Control {
        select() { }
    }
    
    // 错误：“Image”类型缺少“state”属性。
    class Image extends Control implements SelectableControl {
        select() { }
    }
    
}