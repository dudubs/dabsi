export default function deleteAll<T>(
  into: { delete(value: T) },
  ...iterables: Iterable<T>[]
) {
  for (const iterable of iterables) {
    for (const item of iterable) {
      into.delete(item);
    }
  }
}
