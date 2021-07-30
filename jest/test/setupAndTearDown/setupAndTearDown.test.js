beforeEach(() => {
    // console.log('每一个测试 - 开始 - 的时候，我都会执行')
})

afterEach(() => {
    // console.log('每一个测试 - 结束 - 的时候，我都会执行')
})


beforeAll(() => {
    // console.log('我是第一个执行的，只执行一次，所有的测试 *开始* 之前')
})

afterAll(() => {
    // console.log('我是最后一个执行的，只执行一次，所有的测试 *结束* 之后')
})

test('第 一 次', () => {
    // console.log('执行第 一 次测试')
    expect(1).toBe(1)
})

test('第 二 次', () => {
    // console.log('执行第 二 次测试')
    expect(2).toBe(2)
})

test('第 三 次', () => {
    // console.log('执行第 三 次测试')
    expect(3).toBe(3)
})

