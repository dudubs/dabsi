import { ValueRef } from "./ValueRef";

export class Manipulator<T> {
  constructor(public ref: ValueRef<T>) {}

  update<T>(
    this: Manipulator<T>,
    getNextValue: (value: T) => T
  ): Manipulator<T> {
    this.value = getNextValue(this.value);

    return this;
  }

  assign<T extends object, K extends keyof T>(
    this: Manipulator<T>,
    props: Pick<T, K>
  ): Manipulator<T> {
    return this.update(value => ({ ...value, ...props }));
  }

  push<T>(this: Manipulator<T[]>, ...items: T[]): Manipulator<T[]> {
    return this.update(value => {
      return [...value, ...items];
    });
  }

  remove<T>(this: Manipulator<T[]>, item: T): Manipulator<T[]> {
    return this.update(items => items.filter(value => item !== value));
  }

  get value(): T {
    return this.ref();
  }

  set value(value: T) {
    if (value !== this.value) this.ref(value);
  }

  default<T>(
    this: Manipulator<T | undefined | null>,
    value: T
  ): Manipulator<T> {
    return new Manipulator(
      ValueRef(
        () => this.value ?? value,
        nextValue => {
          this.value = nextValue;
        }
      )
    );
  }

  set<T>(this: Manipulator<T[]>, index: number, value: T): Manipulator<T[]>;
  set<T extends object, K extends keyof T>(
    this: Manipulator<T>,
    index: K,
    value: T[K]
  ): Manipulator<T>;
  set(this: Manipulator<any>, keyOrIndex, value): Manipulator<any> {
    return this.update(items => {
      if (items[keyOrIndex] === value) return items;

      if (typeof keyOrIndex === "number" && Array.isArray(items)) {
        return items.map((item, index) =>
          index === keyOrIndex ? value : item
        );
      } else {
        return { ...items, [keyOrIndex]: value };
      }
    });
  }

  at<T, K extends keyof T>(this: Manipulator<T>, key: K): Manipulator<T[K]>;
  at<T>(this: Manipulator<T[]>, index: number): Manipulator<T>;

  at<T, K extends keyof T>(
    this: Manipulator<T>,
    key: K,
    callback: (m: Manipulator<T[K]>) => void
  ): Manipulator<T>;

  at<T>(this: Manipulator<T[]>, index: number): Manipulator<T>;
  at<T>(
    this: Manipulator<T[]>,
    index: number,
    callback: (m: Manipulator<T>) => void
  ): Manipulator<T[]>;

  at(this: Manipulator<any>, keyOrIndex, callback?) {
    const m = new Manipulator(
      ValueRef(
        () => this.value[keyOrIndex],
        value => {
          console.log({ keyOrIndex, value });
          this.set(keyOrIndex, value);
        }
      )
    );
    if (callback) {
      callback(m);
      return this;
    }
    return m;
  }
}

export function manipulate<T extends object>(value: T): Manipulator<T>;
export function manipulate<T extends object>(
  value: T,
  callback: (m: Manipulator<T>) => void
): T;
export function manipulate(value, callback?) {
  const m = new Manipulator<any>(
    ValueRef(
      () => value,
      nextValue => {
        Object.assign(value, nextValue);
      }
    )
  );
  if (callback) {
    callback(m);
    return value;
  }
  return m;
}
