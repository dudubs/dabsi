import { entries } from "./entries";

// export function mapObject<T extends Record<string, any>, R>(
//     obj: T, mapper: (
//         value: T[keyof T],
//         key: string
//     ) => R,
// ): { [_ in keyof T]:R }
export function mapObject<T, R>(
  obj: Record<string, T>,
  mapper: (value: T, key: string) => R
): Record<string, R>;

export function mapObject(obj, mapper) {
  const result: any = {};
  for (const [key, value] of entries(obj)) {
    result[key] = mapper(value, key);
  }
  return result;
}

/*

mapObject<T,R>(

)
 */
