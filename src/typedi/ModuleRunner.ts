import { touchMap } from "../common/map/touchMap";
import { Constructor } from "../common/typings2/Constructor";
import { Resolver } from "./index";
import { getInjectableResolver } from "./decorators/Injectable";
import { moduleOptionsMap } from "./decorators/Module";

export type ChildModuleInterface<Child> = {
  registerChildModule(child: Child);
};

export type ParentModuleInterface<Parent> = {
  registerParentModule(parent: Parent);
};

export type ModuleInterface<Parent = any, Child = any> = Partial<
  ChildModuleInterface<Child> & ParentModuleInterface<Parent>
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

      for (const provider of options.providers || []) {
        const context = Resolver.checkAndResolve(provider, this.context) || {};
        Object.assign(this.context, context);
      }

      const args = Resolver.checkAndResolve(argsResolver, this.context);
      const instance: ModuleInterface = new module(...args);
      for (const dependencyModule of options.dependencies || []) {
        const parent: ModuleInterface = this.get(dependencyModule);
        parent.registerChildModule?.(instance);
        instance.registerParentModule?.(parent);
      }

      return instance;
    });
  }
}

// registerChildModule
// registerParentModule
