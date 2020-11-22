import { Constructor } from "../common/typings2/Constructor";
import { checkResolverSymbol } from "./checkResolver";
import { Consumer } from "./Consumer";
import { Resolver } from "./index";
import { ModuleRunner } from "./ModuleRunner";
import { AnyResolverMap } from "./ObjectResolver";
import { resolveSymbol } from "./resolve";
import { ResolverType } from "./Resolver";

let lastModule: any = undefined;

export type Module = Constructor<any>;

export const getLastModule = () => lastModule;

export type ModuleProvider = Resolver<AnyResolverMap>;

export const ModuleProvider: Consumer<ResolverType<ModuleProvider>> = Consumer;

export const moduleOptionsMap = new WeakMap<Module, ModuleOptions>();
export type ModuleOptions = {
  dependencies?: Module[];
  providers?: ModuleProvider[];
};

export function Module(options: ModuleOptions = {}) {
  return (module: Module) => {
    lastModule = module;

    moduleOptionsMap.set(module, options);

    module[resolveSymbol] = function (this: Constructor<any>, context) {
      return Resolver.resolve(ModuleRunner, context).get(this);
    };
    module[checkResolverSymbol] = function (context) {
      Resolver.check(ModuleRunner, context);
    };
  };
}
