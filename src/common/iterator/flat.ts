type Flattable<T> = T | Flattable<T>[];

export default function* flat<T>(o: Flattable<T>): IterableIterator<T> {
  if (Array.isArray(o)) {
    for (const item of o) {
      yield* flat(item);
    }
  } else {
    yield o;
  }
}
