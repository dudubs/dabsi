// TODO: use reflect.defineMetadata
import "reflect-metadata";
import { WeakMapFactory } from "@dabsi/common/map/mapFactory";
import { Type } from "@dabsi/common/typings2/Type";

const targetPropertyTypeMap = new WeakMap<
  Function,
  Map<string, () => Function>
>();

const targetParameterTypeMap = new WeakMap<
  Function,
  Map<number, () => Function>
>();

export function Forward(
  getType: () => Function
): ParameterDecorator & MethodDecorator & PropertyDecorator {
  return (target, propertyName, indexOrDescriptor?) => {
    if (typeof indexOrDescriptor === "number") {
      targetParameterTypeMap
        .touch(propertyName ? target[propertyName] : target, () => new Map())
        .set(indexOrDescriptor, getType);
    } else {
      targetPropertyTypeMap
        .touch(target, () => new Map())
        .set(propertyName, getType);
    }
  };
}

export namespace Forward {
  export function getParameterType(
    target: Function,
    index: number,
    propertyName?: PropertyKey
  ): Function | undefined {
    return targetParameterTypeMap
      .get(propertyName ? target.prototype[propertyName] : target)
      ?.get(index)?.();
  }

  export function getPropertyType(target: Function, propertyName) {
    return targetPropertyTypeMap.get(target.prototype)?.get(propertyName)?.();
  }
}
