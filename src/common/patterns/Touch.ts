import { Fn } from "@dabsi/common/typings2/Fn";
import { inspect } from "@dabsi/logging/inspect";
import MetadataMap from "./MetadataMap";

const metadataMap = new MetadataMap<
  WeakMap<
    any,
    {
      touched: Map<any, any>;
      inTouch: Set<any>;
    }
  >
>();

function Touch(): MethodDecorator {
  return (target, propertyName, desc) => {
    const thisMap = (metadataMap.get(target)[
      propertyName as any
    ] ||= new WeakMap());

    if (typeof desc.value !== "function") {
      throw new Error("expect to method.");
    }
    const originalValue = desc.value;

    desc.value = <any>function (this: any, ...args) {
      const [key] = args;
      const map = thisMap.touch(this, () => ({
        touched: new Map(),
        inTouch: new Set(),
      }));
      if (map.inTouch.has(key)) {
        throw new Error(`Already in touch ${key}.`);
      }

      return map.touched.touch(key, () => {
        if (!map.inTouch.touch(key)) {
          throw new Error(`Already in-touch  ${inspect(key)}`);
        }
        try {
          return originalValue.apply(this, args);
        } finally {
          map.inTouch.delete(key);
        }
      });
    };
  };
}

namespace Touch {
  export function getMap<T, K extends keyof T>(
    target: T,
    propertyName: K
  ):
    | Map<Parameters<Extract<T[K], Fn>>[0], ReturnType<Extract<T[K], Fn>>>
    | undefined {
    return metadataMap.get(target)[propertyName]?.get(target)?.touched;
  }
}
export default Touch;
