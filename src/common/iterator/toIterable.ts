export default function <T>(iterator: Iterator<T>): Iterable<T> {
  return {
    [Symbol.iterator]: () => iterator,
  };
}
