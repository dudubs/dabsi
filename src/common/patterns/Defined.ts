export function Defined(): PropertyDecorator {
  return (target, propertyName: string) => {
    const symbol = Symbol(propertyName);

    Object.defineProperty(target, propertyName, {
      get() {
        const value = this[symbol];
        if (value === undefined) {
          throw new Error(`"${propertyName}" is undefined.`);
        }
        return value;
      },
      set(value) {
        Object.defineProperty(this, symbol, {
          enumerable: false,
          value,
        });
      },
    });
  };
}
