export function* chain<T>(...iterables: Iterable<T>[]): IterableIterator<T> {
  for (const iterator of iterables) {
    yield* iterator;
  }
}
