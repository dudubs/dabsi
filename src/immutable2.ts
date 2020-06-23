export {
    Set as ImmutableSet,
    Record as ImmutableRecord,
    Map as ImmutableMap,
    List as ImmutableList,
} from "immutable";

import * as Immutable from "immutable";

export type ImmutableKeys = Immutable.Set<string>;
export const ImmutableKeys = Immutable.Set<string>();
