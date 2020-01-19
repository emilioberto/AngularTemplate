// Extensions
interface Array<T> {
  isEmpty(): boolean;
  first(): T;
  firstOrDefault(): T;
  last(): T;
  lastOrDefault(): T;
  distinct(): Array<T>;
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

// Array.prototype.distinct = function <T>(this: Array<T>): Array<T> {
//   if (this.isEmpty()) {
//     return [];
//   }

//   if (
//     this.every(e => typeof e === 'string')
//     || this.every(e => typeof e === 'number')
//     || this.every(e => typeof e === 'boolean')
//   ) {
//     return Array.from(new Set(this.map((item: any) => item)));
//   }

//   if (this.every(e => typeof e === 'object')) {
//     const array = this.map(e => JSON.stringify(e));
//     return (array as any).distinct();
//   }

//   throw Error('Unsupported array type');
// };
