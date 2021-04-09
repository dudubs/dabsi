import { ModuleMetadata } from "./decorators/OldModule";
import { touchMap } from "@dabsi/common/map/touchMap";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Resolver } from "@dabsi/typedi/index";
import { getConstructorParamsResolver } from "@dabsi/typedi/decorators/Injectable";
import { moduleMetadataMap } from "@dabsi/typedi/decorators/OldModule";
import { ResolveError } from "@dabsi/typedi/ResolveError";
import { ModuleTarget } from "@dabsi/typedi/OldModuleMetadata2";

export class OldModuleRunner {
  instanceMap = new Map<ModuleTarget, any>();

  context = { ...Resolver(OldModuleRunner, () => this) };

  mainTarget: ModuleTarget | null = null;

  constructor() {}

  resolve<T>(resolver: Resolver<T>): T {
    return Resolver.resolve(resolver, this.context);
  }

  *getCurrentInstances(): IterableIterator<{
    target: ModuleTarget;
    instance: any;
    metadata: ModuleMetadata;
  }> {
    for (const [target, instance] of this.instanceMap.entries()) {
      yield { target, instance, metadata: moduleMetadataMap.get(target)! };
    }
  }

  getInstance<T>(target: Constructor<T>): T {
    return touchMap(this.instanceMap, target, () => {
      const argsResolver = getConstructorParamsResolver(target);
      const options = moduleMetadataMap.get(target)!;

      for (const dependencyModule of options.dependencies || []) {
        this.getInstance(dependencyModule);
      }

      const args = Resolver.checkAndResolve(
        Resolver.catchOnCheck(argsResolver, error => {
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
