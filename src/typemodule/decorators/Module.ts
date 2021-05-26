import { CallStackAnchor } from "@dabsi/common/CallStackAnchor";
import { Resolver } from "@dabsi/typedi";
import getModuleArgs from "@dabsi/typemodule/getModuleArgs";
import { ModuleOptions } from "@dabsi/typemodule/ModuleMetadata";
import { ModuleRunner, ModuleTarget } from "@dabsi/typemodule/ModuleRunner";

export default (function Module(options = {}) {
  const anchor = CallStackAnchor.capture(Module);
  return (target: ModuleTarget) => {
    const args = getModuleArgs(target);

    options.dependencies && args.dependecies.addAll(options.dependencies);

    Object.defineProperty(args, "options", {
      configurable: false,
      writable: false,
      value: options || args.options,
    });

    Object.defineProperty(args, "anchor", {
      configurable: false,
      writable: false,
      value: anchor,
    });

    Resolver.define(
      target,
      function (context) {
        return Resolver.resolve(ModuleRunner, context).get(this);
      },
      function (context) {
        Resolver.resolve(ModuleRunner, context).addUsedModuleByResolver?.(this);
      }
    );
  };
} as {
  (options?: ModuleOptions): ClassDecorator;
});
