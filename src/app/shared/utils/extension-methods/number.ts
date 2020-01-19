interface Number {
  isOdd(): boolean;
  isEven(): boolean;
}

Number.prototype.isEven = (): boolean => Number(this) % 2 === 0;

Number.prototype.isOdd = (): boolean => !Number(this).isEven();
