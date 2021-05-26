// TODO: use reflect.defineMetadata
import "reflect-metadata";

const FORWARD_PREFIX = "forward:";
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
      if (typeof propertyName !== "string") {
        throw new Error("expected to string");
      }
      Reflect.defineMetadata(FORWARD_PREFIX + propertyName, getType, target);
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

  export function getPropertyType(target: Function, propertyName: string) {
    return Reflect.getMetadata(
      FORWARD_PREFIX + propertyName,
      target.prototype
    )?.();
  }
}
