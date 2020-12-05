import { touchMap } from "../common/map/touchMap";
import { Constructor } from "../common/typings2/Constructor";
import { Resolver } from "./index";
import { getInjectableResolver } from "./decorators/Injectable";
import { moduleOptionsMap } from "./decorators/Module";
import { ResolveError } from "./ResolveError";

export type IChildModule<Child> = {
  registerChildModule(child: Child);
};

export type IParentModule<Parent> = {
  registerParentModule(parent: Parent);
};

export type IModule<Parent = any, Child = Parent> = Partial<
  IChildModule<Child> & IParentModule<Parent>
>;

export class ModuleRunner {
  cache = new Map();

  context = { ...ModuleRunner.provide(() => this) };

  constructor() {}

  get<T>(module: Constructor<T>): T {
    return touchMap(this.cache, module, () => {
      // console.log("init", module.name);
      const argsResolver = getInjectableResolver(module);
      const options = moduleOptionsMap.get(module)!;
      for (const dependencyModule of options.dependencies || []) {
        const parent: IModule = this.get(dependencyModule);
        // parent.registerChildModule?.(instance);
        // instance.registerParentModule?.(parent);
      }

      for (const provider of options.providers || []) {
        const context = Resolver.checkAndResolve(provider, this.context) || {};
        Object.assign(this.context, context);
      }

      const args = Resolver.checkAndResolve(
        Resolver.catch(argsResolver, error => {
          throw new ResolveError(
            `module:${module.name}, ${error.message}`,
            error
          );
        }),
        this.context
      );

      const instance: IModule = new module(...args);

      return instance;
    });
  }
}

// registerChildModule
// registerParentModule
