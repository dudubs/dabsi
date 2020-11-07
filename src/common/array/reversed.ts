export function* reversed<T>(array: T[]): IterableIterator<T> {
  for (let index = array.length - 1; index >= 0; index--) {
    yield array[index];
  }
}
