// Extensions
interface Array<T> {
  isEmpty(): boolean;
  first(): T;
  firstOrDefault(): T;
  last(): T;
  lastOrDefault(): T;
}

Array.prototype.isEmpty = function <T>(this: Array<T>): boolean {
  if (!Array.isArray(this)) {
    throw new Error('Invalid array');
  }
  return this.length === 0;
};

Array.prototype.first = function <T>(this: Array<T>): T {
  if (this.isEmpty()) {
    throw new Error('Empty array');
  }
  return this[0];
};

Array.prototype.firstOrDefault = function <T>(this: Array<T>): T {
  return this.isEmpty ? null : this[0];
};

Array.prototype.last = function <T>(this: Array<T>): T {
  if (this.isEmpty()) {
    throw new Error('Empty array');
  }
  const lastIndex = this.length - 1;
  return this[lastIndex];
};

Array.prototype.lastOrDefault = function <T>(this: Array<T>): T {
  return this.isEmpty ? null : this[this.length];
};
