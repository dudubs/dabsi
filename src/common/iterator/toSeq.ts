import { Seq } from "immutable4";

type ToIndexedSeq<T> = { toSeq(): Seq.Indexed<T> };

declare global {
  interface Array<T> extends ToIndexedSeq<T> {}
  interface Set<T> extends ToIndexedSeq<T> {}

  interface ReadonlyArray<T> extends ToIndexedSeq<T> {}

  interface Map<K, V> {
    toSeq(): Seq.Keyed<K, V>;
    toSeq(type: "values"): Seq.Indexed<V>;
    toSeq(type: "keys"): Seq.Indexed<K>;
  }
}

Array.prototype.toSeq = Set.prototype.toSeq = function () {
  return Seq.Indexed(this);
};

Map.prototype.toSeq = function (type?): any {
  switch (type) {
    case "values":
      return Seq.Indexed(this.values());
    case "keys":
      return Seq.Indexed(this.keys());
    default:
      return Seq.Keyed(this.entries());
  }
};

Set.prototype.toSeq = function () {
  return Seq.Indexed(this);
};
