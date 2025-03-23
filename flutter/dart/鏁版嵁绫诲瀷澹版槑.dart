main() {
  // 单引号声明
  var str = '123';
  // print(str);
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

  // print(str5);

  int num = 123;

  // num = 1.2; // Error

  double dou = 100.00;

  dou = 101; // no error

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

  list4.add('qqh');

  print(list4); // [qqh]

  var list5 = List<String>.filled(3, '');
  list5[0] = '123';
  // list5[1] = 456; // ERROR

  print(list5); // [123, , ]

  // 创建方式一
  Map persion = {
    'name': 'qqh',
    'age': 18
  };
  print(persion); // {name: qqh, age: 18}
  persion['age'] = 17;
  print(persion); //  {name: qqh, age: 17}

  var key = 'name';

  persion[key] = 'cql'; // name是变量

  print(persion); // {name: cql, age: 17}

  
  var p = new Map();

  p['name'] = 'qq';
  p['age'] = 19;
  p['skill'] = 'dart';
  
  print(p); // {name: qq, age: 19, skill: dart}

  var type = '123';

  if(type is int) {
    print("type is int");
  } else if(type is String) {
    print('type is string');
  } else {
    print('type is other');
  }

  if(type.isNotEmpty) {
    
  }

}