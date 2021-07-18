T getType<T>(T value) {
  return value;
}

final String value = getType<String>('123');

abstract class Cache<T> {
  T getValue(T key);
  void setValueByKey(String key, T value);
}

class FeileCache<T> implements Cache<T> {
  @override
  T getValue(T key) {
    return key;
  }

  setValueByKey(String key, T value) {
    print('cache key is $key and value is $value');
  }

}

void main() {
  final FeileCache f = new FeileCache<String>();
  f.setValueByKey('index', 'data');
}