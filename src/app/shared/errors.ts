export class EmptyArrayError extends Error {
  public constructor() {
    super('Empty Array');
    this.name = 'EmptyArrayError';
  }
}

export class InvalidArrayError extends Error {
  public constructor() {
    super('Invalid Array');
    this.name = 'InvalidArrayError';
  }
}

export class ErrorUtils {

  public static throwIfNotArray = <T>(array: Array<T>): void => {
    if (!Array.isArray(array)) {
      throw new InvalidArrayError();
    }
  }

  public static throwIfEmpty = <T>(array: Array<T>): void => {
    if (array.isEmpty()) {
      throw new EmptyArrayError();
    }
  }

}
