import { capitalize } from "@dabsi/common/string/capitalize";

export function Once() {
  return (target, propertyName: string, description: PropertyDescriptor) => {
    const didPropertyName = "_did" + capitalize(propertyName);
    const { value } = description;
    description.value = function () {
      if (didPropertyName in this) return this[didPropertyName];
      return (this[didPropertyName] = value.call(this, arguments));
    };
  };
}
