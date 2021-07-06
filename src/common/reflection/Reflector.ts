import defined from "@dabsi/common/object/defined";
import { Forward } from "@dabsi/common/reflection/Forward";
import "reflect-metadata";

export namespace Reflector {
  export function getDesignParamTypes(target: Function, propertyName?) {
    try {
      return (
        Reflect.getMetadata(
          "design:paramtypes",
          propertyName ? target.prototype : target,
          propertyName
        ) || []
      );
    } catch (error) {
      console.log({ target, propertyName });

      throw error;
    }
  }

  export function getParamTypes(
    target: Function,
    propertyName?: string
  ): Function[] {
    return getDesignParamTypes(target, propertyName).map((type, index) => {
      return Forward.getParameterType(target, index, propertyName) || type;
    });
  }

  export function getParamType(
    target: Function,
    index: number,
    propertyName?: string
  ): Function {
    return defined(
      Forward.getParameterType(target, index, propertyName) ||
        getDesignParamTypes(target, propertyName)[index],
      () => `No param type`
    );
  }

  export function getPropertyType(
    target: Function,
    propertyName
  ): Function | undefined {
    return (
      getPropertyForwardType(target, propertyName) ||
      getPropertyDesignType(target, propertyName)
    );
  }
  export function getPropertyForwardType(
    target: Function,
    propertyName
  ): Function | undefined {
    return Forward.getPropertyType(target, propertyName);
  }

  export function getPropertyDesignType(
    target: Function,
    propertyName
  ): Function | undefined {
    return Reflect.getMetadata("design:type", target.prototype, propertyName);
  }
}
