interface Array<T> {
  intersection<T>(array: Array<T>): Array<T>;
  subtract<T>(array: Array<T>): Array<T>;
}

Array.prototype.intersection = function (arr) {
  return this.filter((el) => arr.includes(el));
};
Array.prototype.subtract = function (arr) {
  return this.filter((el) => !arr.includes(el));
};
