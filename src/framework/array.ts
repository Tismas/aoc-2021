interface Array<T> {
  intersection(array: Array<T>): Array<T>;
  subtract(array: Array<T>): Array<T>;
  get<U>(index: number, fallback?: U): T | U;
}

Array.prototype.intersection = function (arr) {
  return this.filter((el) => arr.includes(el));
};
Array.prototype.subtract = function (arr) {
  return this.filter((el) => !arr.includes(el));
};
Array.prototype.get = function (index, fallback = undefined) {
  return this[index] ?? fallback;
};
