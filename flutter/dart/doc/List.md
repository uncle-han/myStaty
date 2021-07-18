# List

## 属性

### length
* 获取长度

```dart
main() {
  List fruits = ['apple', 'banana', 'orange'];
  print(fruits.length); // 3
}
```

* 清空List的内容

```dart
main() {
  List fruits = ['apple', 'banana', 'orange'];
  fruits.length = 0;
  print(fruits); // []
}
```

* isEmpty 和 isNotEmpty

```dart
main() {
  List fruits = ['apple', 'banana', 'orange'];

  print(fruits.isEmpty); // false
  print(fruits.isNotEmpty); // true

  List nodata = [];

  print(nodata.isEmpty); // true
  print(nodata.isNotEmpty); // false

}
```




