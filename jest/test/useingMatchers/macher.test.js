const {
    add
} = require('./index')

console.log(add);

// 绝对相等 相当于全等操作符 ===
test('add method 1 + 3', () => {
    expect(add(1, 3)).toBe(4)
})


test('object assignment', () => {
    const data = {one: '1'}
    data['tow'] = '2';
    expect(data).toEqual({one: '1', tow: '2'})
})

test('取反操作', () => {
    const bool = false;
    expect(bool).not.toBeTruthy()
})


