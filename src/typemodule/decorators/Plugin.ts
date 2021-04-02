import { ModuleMetadata } from "@dabsi/typemodule/ModuleMetadata";

export default (() => {
  return (target, propertyName, index: number) => {
    const metadata = ModuleMetadata.touch(target.constructor);
    if (!propertyName) {
      throw new Error(`Plugin can be only for class-method.`);
      return;
    }

    metadata.pluginParamIndexesMap
      .touch(propertyName, () => new Set())
      .add(index);
  };
}) as {
  (): {
    (target, propertyName, index: number): void;
  };
};
