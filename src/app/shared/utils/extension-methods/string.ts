interface String {
  contains(value: string, caseSensitive?: boolean): boolean;
  isEmptyOrWhiteSpace(): boolean;
}

String.prototype.isEmptyOrWhiteSpace = function(this: string): boolean {
  return String(this) === '' || (this.length > 0 && this.trim().length === 0);
};

String.prototype.contains = function(this: string, value: string, caseSensitive: boolean = true): boolean {
  if (!value || value.isEmptyOrWhiteSpace()) {
    return false;
  }
  if (!caseSensitive) {
    value = value.toLowerCase();
  }
  return this.indexOf(value) >= 0;
};
