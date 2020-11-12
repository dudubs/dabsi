import "reflect-metadata";
import { WeakMapFactory } from "../common/map/mapFactory";
import { Type } from "../common/typings";

const getTargetParameterTypes = WeakMapFactory(() => [] as (() => Function)[]);
const getTargetPropertyTypes = WeakMapFactory(
  () => ({} as Record<string, () => Function>)
);
export function Forward<T>(
  getType: () => Type<T>
): ParameterDecorator & MethodDecorator & PropertyDecorator {
  return (target, propertyName, indexOrDescriptor?) => {
    if (typeof indexOrDescriptor === "number") {
      getTargetParameterTypes(target)[indexOrDescriptor] = getType;
    } else {
      getTargetPropertyTypes(target)[propertyName] = getType;
    }
  };
}

export namespace Forward {
  export function getParameterType(
    target: Function,
    index: number
  ): Function | undefined {
    return getTargetParameterTypes(target)?.[index]?.();
  }

  export function getPropertyType(target, propertyName) {
    return (
      getTargetPropertyTypes.map.get(target)?.[propertyName] ??
      (() => {
        return Reflect.getMetadata("design:type", target, propertyName);
      })
    )();
  }
}
