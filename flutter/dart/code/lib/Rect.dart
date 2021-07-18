
class Rect {
  num h;
  num w;

  Rect(): w = 10, h = 10;

  num get erea {
    return this.w * this.h;
  }

  void set setH(num h) {
    this.h = h;
  }

}