import { ModuleMetadata } from "@dabsi/typedi/decorators/Module";
import { touchMap } from "@dabsi/common/map/touchMap";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Resolver } from "@dabsi/typedi/index";
import { getInjectableResolver } from "@dabsi/typedi/decorators/Injectable";
import {
  moduleMetadataMap,
  ModuleTarget,
} from "@dabsi/typedi/decorators/Module";
import { ResolveError } from "@dabsi/typedi/ResolveError";

export class ModuleRunner {
  protected cache = new Map<ModuleTarget, any>();

  context = { ...ModuleRunner.provide(() => this) };

  constructor() {}

  *getAllInstances(): IterableIterator<{
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

  getInstance<T>(target: Constructor<T>): T {
    return touchMap(this.cache, target, () => {
      if (!this._mainModuleTarget) {
        this._mainModuleTarget = target;
      }

      log.trace(() => `init module ${target.name}`);
      const argsResolver = getInjectableResolver(target);
      const options = moduleMetadataMap.get(target)!;
      for (const dependencyModule of options.dependencies || []) {
        this.getInstance(dependencyModule);
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

      const instance = new target(...args);

      return instance;
    });
  }
}

// registerChildModule
// registerParentModule
