export default function* repeatDiff<T>(
  value: T,
  getNext: (value: T) => T
): IterableIterator<T> {
  while (true) {
    yield value;
    const next = getNext(value);
    if (next === value) break;
    value = next;
  }
}
