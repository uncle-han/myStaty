import {
    getInforList,
    getGoodList,
    getToken,
    passwordVarificationFailed
} from './getDate'


const toEqualRespone = { data: { name: 'qqh', age: 18 } }

// 错误写法
/*
    分析：
    请求还没有走完，测试用例已经走完了，
*/
// test.skip('通过回调，判断异步请求有没有完成', () => {
//     const callBack = (data) => {
//         console.log('--------', data)
//         expect(data).toEqual(toEqualRespone)
//     }
//     getInforList(callBack)
// })

// 通过回调，判断异步请求有没有完成
test.skip('通过回调，判断异步请求有没有完成', done => {
    const callBack = (data) => {
        expect(data).toEqual(toEqualRespone)
        done()
    }
    getInforList(callBack)
})

const goodList = { list: [ { id: 0, title: '秒杀类苹果', desc: '10元秒杀' } ] }

test.skip('promise 处理异步测试', () => {
    return getGoodList().then(data => {
        // console.log('promise', data)
        expect(data).toEqual(goodList)
    })
})

// promise 处理成功的异步的测试结果
test.skip('获取token', () => {
    return getToken().then(token => {
        expect(token).toBe(112233)
    })
})

// promise 处理失败的异步的测试结果
test.skip('密码校验失败', () => {
    return passwordVarificationFailed().catch(error => {
        // console.log('failed', error)
        expect.assertions(1) // 至少执行一次expect，如果没有执行，就测试不通过
        expect(error.toString()).toMatch('401')
    })
})

// resolve 、 reject
test.skip('使用resolve来完成异步的请求', () => {
    // 只有promise是成功的，才会有resolve的操作
    return expect(getToken()).resolves.toBe(112233)
})


test.skip('使用reject来完成异步的请求', () => {
    // 只有promise是成功的，才会有resolve的操作
    return expect(passwordVarificationFailed()).rejects.toThrow(/401/)
})

// async await 测试异步请求

test.skip('async await 测试异步请求', async () => {
    const token = await getToken()
    expect(token).toBe(112233)
})

test.skip('async await 处理异常请求', async () => {
    expect.assertions(1)
    try {
        // console.log('---await passwordVarificationFailed()', await passwordVarificationFailed())
        await passwordVarificationFailed()
    } catch (error) {
        expect(error.toString()).toMatch(/401/)
    }
})

// async await 配合 .resolves / .rejects 来测试异步请求
test.skip('async await 配合 .resolves 测试异步请求', async () => {
    await expect(getToken()).resolves.toBe(112233)
})

test.skip('async await 配合 .rejects 处理异常请求', async () => {
    await expect(passwordVarificationFailed()).rejects.toThrow(/401/)
})
