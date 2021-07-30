import { forEach } from "./index";

// console.log('mockCallBack.mock.calls', mockCallBack.mock.calls.length)

test("mockCallBack.mock.calls.length", () => {
  const mockCallBack = jest.fn((item) => item * 2);

  forEach([1, 2, 3, 4], mockCallBack);
    // console.log("mockCallBack", mockCallBack);
  //   console.log("mockCallBack.mock", mockCallBack.mock);
  expect(mockCallBack.mock.calls.length).toBe(4); // mock函数总共调用了四次

  expect(mockCallBack.mock.calls[1][0]).toBe(2); // 调用参数里面，第二次调用的第一个参数是2
  expect(mockCallBack.mock.calls[3][0]).toBe(4); // 调用参数里面，第四次调用的第一个参数是4
});

test('mock函数给到固定的返回值', () => {
	const myMock = jest.fn();

	// console.log(myMock())

	myMock.mockReturnValueOnce(1)
		.mockReturnValueOnce(2)
		.mockReturnValue(10);

		// console.log('add return value after', myMock);

		// console.log(myMock(), myMock(), myMock(), myMock())
})

test('设置初始值和一次性返回值，先使用一次性的返回值，才最后才使用默认值', () => {
	const myMock = jest.fn(() => 'default value');

	myMock.mockReturnValueOnce(1)
		.mockReturnValueOnce(2)

	// console.log(myMock()) // 1
	// console.log(myMock()) // 2
	// console.log(myMock()) // 'default value'，一次性放回值用完了，就使用初始值，作为返回值
	// console.log(myMock()) // 'default value'
})

test('设置的返回值，会覆盖初始值', () => {
	const myMock = jest.fn(() => 'default value');

	myMock.mockReturnValueOnce(1)
		.mockReturnValueOnce(2)
		.mockReturnValue(10);

	// console.log(myMock()) // 1
	// console.log(myMock()) // 2
	// console.log(myMock()) // 10 // 将覆盖 'default value' 的初始值
	// console.log(myMock()) // 10
})

test('mock 给定返回值的应用', () => {
	const myMock = jest.fn()
	myMock.mockReturnValueOnce(false)
		.mockReturnValueOnce(true);
	const a = [1, 2].filter(myMock);
	// console.log(a) // => [2]
	expect(myMock.mock.calls.length).toBe(2); // 被调用两次
	expect(myMock.mock.calls[0][0]).toBe(1);
	expect(myMock.mock.calls[1][0]).toBe(2)
})



// mock modules
import {getGoodList, foo} from './jest-mock'; // 引入函数

jest.mock('./jest-mock')

test('mock modules', () => {
	const date = {list:[{ id: 0, title: '秒杀类苹果', desc: '10元秒杀' }]}
	getGoodList.mockResolvedValue(date) // 模拟成功返回的数据是什么
	return getGoodList().then(res => {
		expect(res).toEqual(date)
	})
})


test('mock implementations', ()=> {
	const myMock = jest.fn(cb => cb(false, true));

	myMock((a, b) => {
		// console.log('a,b', a, b)
		expect(b).toBe(true)
	})

})

test('mock impletations of modules', () => {
	foo.mockImplementation(() => 3)
	// console.log(foo()) // 3
	// console.log(foo()) // 3
	expect(foo()).toBe(3)
})


// mock names 

test('mock names', () => {
	const myMockFn = jest
  .fn()
  .mockReturnValue('default')
  .mockImplementation(scalar => {
		// console.log('scalar', scalar)
		return 42 + scalar
	})
  .mockName('add42');

	// console.log(myMockFn.getMockName())
	// console.log(myMockFn(-2))
	// console.log(myMockFn())

})

// const {getChangedFilesForRoots} = require('jest-changed-files');


import { getChangedFilesForRoots } from 'jest-changed-files';

// print the set of modified files since last commit in the current repo
getChangedFilesForRoots(['./'], {
  lastCommit: true,
}).then(result => console.log(result.changedFiles));

// const {parseWithComments} = require('jest-docblock');
import { parseWithComments } from 'jest-docblock';

const code = `
/**
 * This is a sample
 *
 * @flow
 */

 console.log('Hello World!');
`;

const parsed = parseWithComments(code);

// prints an object with two attributes: comments and pragmas.
console.log(parsed);



