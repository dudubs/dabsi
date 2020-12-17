import { ModuleMetadata } from "./decorators/Module";
import { touchMap } from "@dabsi/common/map/touchMap";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Resolver } from "@dabsi/typedi/index";
import { getInjectableResolver } from "@dabsi/typedi/decorators/Injectable";
import {
  moduleMetadataMap,
  ModuleTarget,
} from "@dabsi/typedi/decorators/Module";
import { ResolveError } from "@dabsi/typedi/ResolveError";

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
  protected cache = new Map<ModuleTarget, any>();

  context = { ...ModuleRunner.provide(() => this) };

  constructor() {}

  *getLoadedModules(): IterableIterator<{
    target: ModuleTarget;
    instance: any;
    metadata: ModuleMetadata;
  }> {
    for (const [target, instance] of this.cache.entries()) {
      yield { target, instance, metadata: moduleMetadataMap.get(target)! };
    }
  }

  protected _mainModuleTarget: ModuleTarget | null = null;

  get mainModuleTarget(): ModuleTarget | null {
    return this._mainModuleTarget;
  }

  getModuleInstance<T>(target: ModuleTarget): T {
    return touchMap(this.cache, target, () => {
      if (!this._mainModuleTarget) {
        this._mainModuleTarget = target;
      }
      // console.log("init", module.name);
      const argsResolver = getInjectableResolver(target);
      const options = moduleMetadataMap.get(target)!;
      for (const dependencyModule of options.dependencies || []) {
        const parent: IModule = this.getModuleInstance(dependencyModule);
        // parent.registerChildModule?.(instance);
        // instance.registerParentModule?.(parent);
      }

      for (const provider of options.providers || []) {
        const context = Resolver.checkAndResolve(provider, this.context) || {};
        Object.assign(this.context, context);
      }

      const args = Resolver.checkAndResolve(
        Resolver.catch(argsResolver, error => {
          throw new ResolveError(`At module ${target.name}, ${error.message}`);
        }),
        this.context
      );

      const instance: IModule = new target(...args);

      return instance;
    });
  }
}

// registerChildModule
// registerParentModule
