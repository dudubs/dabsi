import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Type } from "@dabsi/common/typings2/Type";
import { WeakId } from "@dabsi/common/WeakId";

export const getTypeToken = WeakMapFactory((type: Type<any>) => {
  return `typed:${type.name}:${WeakId(type)}`;
});
