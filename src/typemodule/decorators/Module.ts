import { Resolver } from "@dabsi/typedi";
import { CallStackAnchor } from "@dabsi/typedi/CallStackAnchor";
import {
  ModuleMetadata,
  ModuleOptions,
} from "@dabsi/typemodule/ModuleMetadata";
import { ModuleRunner, ModuleTarget } from "@dabsi/typemodule/ModuleRunner";

export default (function Module(options = {}) {
  const anchor = CallStackAnchor.capture(Module);
  return (target: ModuleTarget) => {
    const args = ModuleMetadata.touch(target);

    options.dependencies?.forEach(target => {
      args.dependencies.add(target);
    });

    args.anchor = anchor;

    Object.assign(args.options, options);

    target[Resolver.resolveSymbol] = function (context) {
      return Resolver.resolve(ModuleRunner, context).get(this);
    };
    target[Resolver.checkSymbol] = function (context) {
      Resolver.check(ModuleRunner, context);
    };
  };
} as {
  (options?: ModuleOptions): ClassDecorator;
});
