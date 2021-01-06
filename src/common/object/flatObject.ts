import { entries } from "./entries";
import objectBases from "./objectBases";

/*

mapObject<T,R>(

)
 */
export function flatObject(o: object) {
  const f = {};
  for (const base of objectBases(o)) {
    for (const [key, value] of entries(base)) {
      if (!(key in f)) {
        f[key] = value;
      }
    }
  }
  return f;
}
