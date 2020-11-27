export function* parents<
  T extends { [_ in K]?: T | null },
  K extends string = "parent"
>(
  obj,
  {
    key = "parent" as K,
    skipThis = false,
  }: { key?: K; skipThis?: boolean } = {}
): IterableIterator<T> {
  if (obj && !skipThis) {
    yield obj;
    obj = obj[key];
  }
  while (obj) {
    yield obj;
    obj = obj[key];
  }
}
