import { capitalize } from "@dabsi/common/string/capitalize";

export function Once() {
  return (target, propertyName: string, description: PropertyDescriptor) => {
    const cache = new WeakMap();
    const { value } = description;
    description.value = function (...args) {
      return cache.touch(this, () => value.call(this, args));
    };
  };
}
