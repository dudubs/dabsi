export type Waiter<T> = Promise<T> & {
  resolve(value: T): void;
  reject(error: any): void;
} & (T extends void
    ? {
        resolve(): void;
      }
    : {});

export function Waiter<T = any>(): Waiter<T> {
  let props;
  const promise = <Waiter<T>>new Promise((resolve, reject) => {
    props = { resolve, reject };
  });
  Object.assign(promise, props);
  return promise;
}
