// TODO: Do Set.prototype.addAll|removeAll
export default function addAll<T>(
  into: { add(value: T) },
  ...iterables: Iterable<T>[]
) {
  for (const iterable of iterables) {
    for (const item of iterable) {
      into.add(item);
    }
  }
}
