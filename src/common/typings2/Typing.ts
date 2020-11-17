export function Typing<T>(): T {
  return <any>(() => {
    throw new Error();
  });
}
