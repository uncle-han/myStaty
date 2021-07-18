import 'dart:ffi';

class Person {
  String name;
  int age = 18;
  Person(this.name, this.age);

  void move(speed) {
    print('${this.name} is moving, speed is $speed');
  }

  // 非静态的方法，可以调用静态成员和非静态成员

  void printInfo() {
    print('姓名：${this.name}----年龄：${this.age}');
  }


}
