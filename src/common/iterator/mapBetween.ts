import toIterable from "./toIterable";

export default function* <T, U>(
  iterator: Iterator<T>,
  isFirst: (value: T, index: number) => boolean,
  isLast: (value: T, index: number) => boolean,
  callback: (value: T, index: number) => U
): IterableIterator<T | U> {
  let counter = 0;
  let hasFirst = false;
  let hasLast = false;

  for (let item of toIterable<any>(iterator)) {
    if (hasLast) {
      yield item;
      continue;
    }
    const index = counter++;
    if (hasFirst) {
      hasLast = isLast(item, index);
      item = callback(item, index);
    } else {
      if ((hasFirst = isFirst(item, index))) {
        hasLast = isLast(item, index);
        item = callback(item, index);
      }
    }
    yield item;
  }
}
