import { Seq } from "immutable";
import { Lazy } from "../patterns/lazy";
declare global {
  interface Array<T> {
    toSeq(): Seq.Indexed<T>;
  }
  interface ReadonlyArray<T> {
    toSeq(): Seq.Indexed<T>;
  }
}

Object.defineProperty(Array.prototype, "toSeq", {
  enumerable: false,
  value() {
    return Seq.Indexed(this);
  },
});