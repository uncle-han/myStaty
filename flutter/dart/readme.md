# 变量声明

> var

- 自动判断类型
- 赋值的是什么数据类型，就不能赋值其他数据类型

```dart
main() {
  var str = '123'; // 自动判断类型，当前类型为字符串;
  str = 456; // ERROR A value of type 'int' can't be assigned to a variable of type 'String'.
  print(str); // 123
  var num = 456; // 自动判断类型，当前类型为字符串;
  print(num); // 456
  var b = true;
  print(b);
  var list = [1,2,3];
  print(list); // [1, 2, 3]
  var map = {
    'name': 'qqh',
    'age': 18
  };
  print(map); // {name: qqh, age: 18}
}
```

> int

```dart
main() {
  int num = 123; // 声明一个数值类型
  print(num); // 123

  int str = '123'; // ERROR， 声明的是数值类型，不能赋值字符串类型
}
```

> bool

```dart
main() {
  bool f = false;
  print(f); // false
  bool t = true;
  print(t); // true
  // bool o = 1; // ERROR  A value of type 'int' can't be assigned to a variable of type 'bool'.
}
```

> Sring

```dart
main() {
  String str = '123';
  print(str); // 123
  str = '456';
  str = 789; // ERROR A value of type 'int' can't be assigned to a variable of type 'String'
}
```

# 常亮声明

> const

```dart
const PI = 3.1415926;
```

> final

```dart
final PI = 3.1415926;
```

# 数据类型

## 字符串

```dart
main() {
  // 单引号声明
  var str = '123';

  // 双引号声明
  var str2 = "123";
  // String声明

  String str3 = '123';

  // 前后是相同的''' 或者 """

  var str4 = """123
    22211
      333
  """;

  String str5 = '''a
    swwaaaaaaaa
        333
  ''';

}
```

## 数值类型

```dart
  main() {
    // 只能是整数
    int num = 123;

    num = 1.2; // Error

    // double可以是整数，也库是浮点数
    double dou = 100.00;

    dou = 101; // no error
  }
```

## 布尔类型

```dart
main() {
  bool t = true;
  bool f = false;
}
```

## 数组(集合)类型;

```dart
main() {

  List list = ['李四', 100, false];

  print(list.length); // 3

  print(list[0]); // 李四

  print(list[1]); // 100

  print(list[2]); // false

  // 指定数据类型

  List list2 = <int>[1,2,3,4];

  print(list2); // [1,2,3,4]

  List list3 = <String>['1','2', '3'];

  print(list3); // [1, 2, 3]

  var list4 = [];

  list4.add('qqh'); // 给数组添加数据

  print(list4); // [qqh]

  list5 = List<String>.filled(10, '') // 创建长度为10的list，每一项数据都是空字符串

  var list6 = List<String>.filled(3, ''); // 通过filled创建固定长度的list,且类型是string
  list6[0] = '123';
  // list6[1] = 456; // ERROR

  print(list6); // [123, , ]
}
```

## map 类型、对象类型

```dart
main() {
  // 创建方式一
  Map persion = {
    'name': 'qqh',
    'age': 18
  };
  print(persion); // {name: qqh, age: 18}
  persion['age'] = 17;
  print(persion); //  {name: qqh, age: 17}

  var key = 'name';

  persion[key] = 'cql'; // key是变量

  print(persion); // {name: cql, age: 17}

  var p = new Map();

  p['name'] = 'qq';
  p['age'] = 19;
  p['skill'] = 'dart';

  print(p); // {name: qq, age: 19, skill: dart}

}
```

## Runes

## Symbols

# is 关键字

```dart
main() {
  var type = '123';
  if(type is int) {
    print("type is int");
  } else if(type is String) {
    print('type is string');
  } else {
    print('type is other');
  }
  // output => type is string
}
```

