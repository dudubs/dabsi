import { Seq } from "immutable4";

type ToIndexedSeq = { toSeq<T>(this: Iterable<T>): Seq.Indexed<T> };

declare global {
  interface Array<T> extends ToIndexedSeq {}
  interface Set<T> extends ToIndexedSeq {}

  interface ReadonlyArray<T> extends ToIndexedSeq {
    toSeq<T>(this: Iterable<T>): Seq.Indexed<T>;
  }

  interface Map<K, V> {
    toSeq(): Seq.Keyed<K, V>;
  }
}

Object.defineProperty(Array.prototype, "toSeq", {
  enumerable: false,
  value() {
    return Seq.Indexed(this);
  },
});

Object.defineProperty(Set.prototype, "toSeq", {
  enumerable: false,
  value() {
    return Seq.Indexed(this);
  },
});

Object.defineProperty(Map.prototype, "toSeq", {
  enumerable: false,
  value() {
    return Seq.Keyed(this.entries());
  },
});
