const {
    add,
    isNull,
    isFalse,
    getValue,
    isDefined
} = require('./index')

// 绝对相等 相当于全等操作符 ===
test.skip('add method 1 + 3', () => {
    expect(add(1, 3)).toBe(4)
})


test.skip('object assignment', () => {
    const data = {one: '1'}
    data['tow'] = '2';
    expect(data).toEqual({one: '1', tow: '2'})
})

test.skip('取反操作', () => {
    const bool = false;
    expect(bool).not.toBeTruthy()
})

// 检查结果是否为 null

test.skip('is null result', () => {
    expect(isNull()).toBeNull()
})

// 匹配结果是不是为 false
test.skip('is false ?', () => {
    expect(isFalse()).toBeFalsy()
})

// 匹配结果为 undefined
test.skip('is undefine ?', () => {
    expect(getValue()).toBeUndefined()
})

// 匹配结果为以已定义
test.skip('is define ?', () => {
    expect(isDefined).toBeDefined()
})


// 数字的匹配器
// 等于
// 由于数字是简单类型,可以使用 toBe, toEqul进行判断

test.skip('判断数字是否相等', () => {
    const num1 = 10;
    const num2 = 10;
    expect(num1).toBe(num2)
    expect(num1).toEqual(num2)
})

// 大于 toBeGreaterThan
test.skip('10 大于 9 ？', () => {
    const ten = 10;
    const nine = 9;
    expect(ten).toBeGreaterThan(nine)
})

test.skip('10.1 大于 10 ?', () => {
    expect(10.1).toBeGreaterThan(10)
})

test.skip('11.2 大于 11.1', () => {
    expect(11.2).toBeGreaterThan(11.1)
})

// 大于等于
test.skip('10 大于等于 10', () => {
    expect(10).toBeGreaterThanOrEqual(10)
})

test.skip('10 大于等于 8', () => {
    expect(10).toBeGreaterThanOrEqual(8)
})

test.skip('10 不大于等于 11', () => {
    expect(10).not.toBeGreaterThanOrEqual(11)
})

// 小于
test.skip('10 小于 11', () => {
    expect(10).toBeLessThan(11)
})

test.skip('11.1 小于 11.2', () => {
    expect(11.1).toBeLessThan(11.2)
})

// 小于等于
test.skip('10 小于等于 10', () => {
    expect(10).toBeLessThanOrEqual(10)
})

// 特别注意，两个数之间的相减/相加， 与结果比较
test.skip('0.1 + 0.2 结果近似等于0.3', () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3) // toBeCloseTo 近似等于，不相等，更不完全相等
    // expect(0.1 + 0.2).toBe(0.3) // error => Expected: 0.3; receied 0.30000000000000004
    // expect(0.1 + 0.2).toEqual(0.3) // error => Expected: 0.3; receied 0.30000000000000004
})

test.skip('0.3 - 0.1 结果近似等于0.2', () => {
    expect(0.3 - 0.1).toBeCloseTo(0.2)   
})

// 匹配某个字符串里面 没有 某个I
test.skip('there is no I in "item" letter', () => {
    expect('item').not.toMatch(/I/)
})

// 匹配字符里面，是否有某一个规则的字符
test.skip('but there is a "stop" in christoph', () => {
    expect('christoph').toMatch('stop')
    expect('christoph').toMatch(/stop/)
})

// 匹配某个数组(迭代器)里面，是否包含某个一项(每一项是简单的数据类型)

const numList = [1, 2, 3, 4, {}]

test.skip('have one item in numList', () => {
    expect(numList).toContain(2)
    // expect(numList).toContain({}) // error =>  Expected value: {}; Received array: [1, 2, 3, 4, {}]
    // Looks like you wanted to test.skip for object/array equality with the stricter `toContain` matcher. You probably need to use `toContainEqual` instead.
})

// 用于匹配迭代器、数组里面是否包含某项
test.skip('have contain {name: "qqh"} in array', () => {
    const inforList = [1, 2, {name: 'qqt'}, {name: 'qqh'}]
    expect(inforList).toContainEqual({name: 'qqh'})
})

