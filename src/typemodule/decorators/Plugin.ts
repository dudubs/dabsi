import getModuleArgs from "@dabsi/typemodule/getModuleArgs";

export default (() => {
  return (target, propertyName, index?: number) => {
    if (!propertyName) {
      throw new Error(`Plugin can be only for class-method.`);
    }

    const args = getModuleArgs(target.constructor);

    if (typeof index === "number") {
      args.methodPluginMap.touch(propertyName, () => new Set()).add(index);
    } else {
      args.propertyPlugins.add(propertyName);
    }
  };
}) as {
  (): {
    (target, propertyName, index?: number): void;
  };
};
