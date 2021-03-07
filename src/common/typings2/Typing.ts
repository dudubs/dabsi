export function Typing<T>(): T {
  return <any>(() => {
    throw new Error();
  });
}

export const type = null as never;
