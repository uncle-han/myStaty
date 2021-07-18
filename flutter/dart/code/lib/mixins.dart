class A {
  void printA() {
    print('A');
  }
}

class B {
  void printB() {
    print('B');
  }
}

class Persion {
  String name;
  int age;
  Persion(this.name, this.age);
  printInfo() {
    print('${this.name}-----${this.age}');
  }
}

class C extends Persion with A,B {
  C(String name, int age) : super(name, age);
}


// 被mixins 的class不能有构造函数
// 被mixins 的class不能继承任何class
// 
void main() {
  final C c = new C('cql', 29);

  c.printA();

  c.printB();

}