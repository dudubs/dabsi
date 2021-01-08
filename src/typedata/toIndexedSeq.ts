import { Seq } from "immutable4";

export function toIndexedSeq<T>(
  item: T | undefined,
  getNextItem: (item: T) => T | undefined
): Seq.Indexed<T> {
  return Seq.Indexed(flat());

  function* flat() {
    while (typeof item !== "undefined") {
      yield item;
      item = getNextItem(item);
    }
  }
}
