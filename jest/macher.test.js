const {
    _tobe
} = require('./machcase')


test('tset coverage', () => {
    expect(_tobe(1, 1)).toBe(2)
})

// toBe
test('toBe case', () => {
    // Object.is()
    const num = 1
    expect(num).toBe(1)
})

// toBeEqual
test('toEqual-case', () => {
    // == 的对比
    const person = {name: 'qqh', age: 18}
    person.age = 17
    expect(person).toEqual({name: 'qqh', age:17})
})

// toBeGreaterThen 大于
test('toBeGreaterThan case', () => {
    const num = 10
    expect(num).toBeGreaterThan(9)
})

// toBeLessThan 小于
test('toBeLessThan case', () => {
    const num = 10
    expect(num).toBeLessThan(11)
})


// toBeGreaterThanOrEqual 大于等于
test('toBeGreaterThanOrEqual case', () => {
    const num = 10
    expect(num).toBeGreaterThanOrEqual(10)
})

// toBeLessThanOrEqual小于或者等于
test('toBeLessThanOrEqual case 1', () => {
    const num = 10;
    expect(num).toBeLessThanOrEqual(10);
})

// toBeLessThanOrEqual小于或者等于
test('toBeLessThanOrEqual case 2', () => {
    const num = 10;
    expect(num).toBeLessThanOrEqual(11);
})


// 字符串的匹配器
// toMach

//支持正则和字符串
test('toMatch test', () => {
    const msg = 'i love you'
    expect(msg).toMatch(/l/)
    expect(msg).toMatch('you')
})

// 数组
// 查看数组中，是否包含某个项 （简单类型）
test('toContain case', () => {
    const arr = [1, 2, 3, 4]
    expect(arr).toContain(3)

    const objArray = [
        {
            a: 1
        },
        {
            b: 2
        }
    ]

    expect(objArray).toContainEqual({
        a: 1
    })
})

// 查看数组中，是否包含某个项 （引用类型）
test('toContainEqual case', () => {
    
    const objArray = [
        {
            a: 1
        },
        {
            b: 2
        }
    ]

    expect(objArray).toContainEqual({
        a: 1
    })
})

