import { WeakMapFactory } from "../common/map/mapFactory";
import { Type } from "../common/typings";
import { WeakId } from "../common/WeakId";

export const getTypeToken = WeakMapFactory((type: Type<any>) => {
  return `typed:${type.name}:${WeakId(type)}`;
});
