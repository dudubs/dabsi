export type ValueRef<T> = {
  (): T;
  (value: T): void;
};

export function ValueRef<T>(
  getValue: () => T,
  setValue: (value: T) => void
): ValueRef<T> {
  return (...args) => {
    if (args.length) {
      setValue(args[0]);
    } else {
      return getValue() as any;
    }
  };
}
