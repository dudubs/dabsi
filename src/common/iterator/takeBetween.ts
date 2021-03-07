import toIterable from "./toIterable";

export default function* <T>(
  iterator: Iterator<T>,
  isFirst: (value: T, index: number) => boolean,
  isLast: (value: T, index: number) => boolean
): IterableIterator<T> {
  let counter = 0;
  let hasFirst = false;

  for (let item of toIterable<any>(iterator)) {
    const index = counter++;
    if (hasFirst) {
      yield item;
      if (isLast(item, index)) break;
    } else {
      if ((hasFirst = isFirst(item, index))) {
        yield item;
        if (isLast(item, index)) break;
      }
    }
  }
}
