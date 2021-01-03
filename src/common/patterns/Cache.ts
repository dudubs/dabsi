import { touchMap } from "@dabsi/common/map/touchMap";

export default function Cache(propertyNames?: string[]): MethodDecorator {
  return <
    K extends string,
    T extends Record<K, (key: any, ...args: any[]) => any>
  >(
    target: T,
    propertyName: K,
    desc
  ) => {
    const cacheMap = new WeakMap<any, Map<string, any>>();
    const { value } = desc;
    propertyNames?.push(propertyName);
    desc.value = function (...args) {
      const cache = touchMap(cacheMap, this, () => new Map());
      const key = args[0];
      return touchMap(cache, key, () => {
        return value.apply(this, args);
      });
    };
    desc.value.cacheMap = cacheMap;
  };
}

Cache.clear = function <T, K extends keyof T>(instance: T, propertName: K) {
  (<any>instance[propertName]).cacheMap.delete(instance);
};
