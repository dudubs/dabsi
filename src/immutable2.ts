export {
  Set as ImmutableSet,
  Record as ImmutableRecord,
  Map as ImmutableMap,
  List as ImmutableList,
} from "immutable";

import * as Immutable from "immutable";
import { Seq } from "immutable";

export type ImmutableKeys = Immutable.Set<string>;
export const ImmutableKeys = Immutable.Set<string>();

export type IndexedSeq<T> = Seq.Indexed<T>;
export const IndexedSeq = Seq.Indexed;

export { Immutable, Seq };
