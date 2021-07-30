test.only('这里只执行，其他都不执行', () => {
    // console.log('这里只执行，其他都不执行')
    expect(0).toBe(0)
})


test('这里不执行', () => {
    console.log('下面的不会执行，即使是错的测试用例')
    expect(1).toBe(2)
})
