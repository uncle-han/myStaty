beforeAll(() => {
  // console.log("1 - 外层的 beforeAll")
});
afterAll(() => {
  // console.log("1 - 外层的 afterAll")
});
beforeEach(() => {
  // console.log("1 - 外层的 beforeEach")
});
afterEach(() => {
  // console.log("1 - 外层的 afterEach")
});
test("", () => {
  // console.log("1 - 外层的 test")
});
describe("Scoped / Nested block", () => {
  beforeAll(() => {
    // console.log("2 - 内层的 beforeAll")
  });
  afterAll(() => {
    // console.log("2 - 内层的 afterAll")
  });
  beforeEach(() => {
    // console.log("2 - 内层的 beforeEach")
  });
  afterEach(() => {
    // console.log("2 - 内层的 afterEach")
  });
  test("", () => {
    // console.log("2 - 内层的 test")
  });
});

// 1 - beforeAll    外层的 before all
// 1 - beforeEach   外层的 before each，
// 1 - test         开的第一个
// 1 - afterEach    // 当前已经结束了最外层的测试，进入到nested block作用域里面，
// 2 - beforeAll    // nested block作用域里面的 beforeAll 先执行
// 1 - beforeEach   // 再到上一层作用域的执行
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll

/*
    总结：
        befor => 最上一层的作用域会先执行
        after => 测试用例在的作用域会先执行
        同一个作用域执行优先级 beforeAll > beforEach > test > afterEach > afterAll
*/
