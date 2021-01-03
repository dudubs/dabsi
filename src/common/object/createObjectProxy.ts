import { entries } from "./entries";

const proxyContext = Symbol();

export function createObjectProxy(object, getter) {
  const proxy = {};
  for (const [key, value] of entries(object)) {
    Object.defineProperty(proxy, key, {
      enumerable: true,
      get(this) {
        const desc = Object.getOwnPropertyDescriptor(this, key);
        if (desc) {
          return desc.value;
        }
        const v = getter(value, key, this[proxyContext]);
        Object.defineProperty(this, key, { value: v });
        return v;
      },
    });
  }
  return context => {
    return Object.setPrototypeOf({ [proxyContext]: context }, proxy);
  };
}
