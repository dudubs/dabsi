import { Reflector } from "@dabsi/common/reflection/Reflector";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { ModuleMetadata } from "@dabsi/typemodule/ModuleMetadata";
import { AsyncProcess } from "../common/async/AsyncProcess";
import { InstanceEmitter } from "./InstanceEmitter";
import { locateError } from "./locateError";

export type ModuleTarget = Function;

export interface ModuleLoader {
  (target: ModuleTarget): Awaitable;
}

export class ModuleRunner {
  readonly process = new AsyncProcess();

  readonly context: ResolverMap = Resolver.Context.flat({}, [
    this,
    this.process,
  ]);

  protected _moduleInstanceMap = new Map<ModuleTarget, any>();

  protected _loaders: ModuleLoader[] = [];

  protected _moduleEmitter = new InstanceEmitter();

  protected _errors: any[] = [];

  log = log.get("runner");

  get loadedModules(): ModuleTarget[] {
    return [...this._moduleInstanceMap.keys()];
  }

  get<T>(target: ModuleTarget | Constructor<T>): T {
    if (this._moduleInstanceMap.has(target)) {
      return this._moduleInstanceMap.get(target);
    }

    const metadata = ModuleMetadata.get(target);
    for (const target of metadata.dependencies) {
      void this.get(target);
    }

    const instance = Resolver.Injectability.resolve(target, this.context);

    this._moduleInstanceMap.set(target, instance);
    this._moduleEmitter.emit(instance);

    this._loadModulePlugins(target);
    this.process.push(() =>
      Promise.all(this._loaders.map(loader => loader(target)))
    );

    return instance;
  }

  pushLoader(loader: ModuleLoader) {
    this._loaders.push(loader);
    this.process.push(
      Promise.all(
        // makes copy of loaded-modules
        [...this._moduleInstanceMap.keys()].map(
          //
          target => loader(target)
        )
      )
    );
  }

  resolve<T>(resolver: Resolver<T>): T {
    return Resolver.resolve(resolver, this.context);
  }

  protected _loadModulePlugins(target: ModuleTarget) {
    const metadata = ModuleMetadata.get(target);
    for (const propertyName of metadata.pluginParamIndexesMap.keys()) {
      this._waitForPlugins(metadata, propertyName).then(() => {
        this.process.push(async () => {
          try {
            await Resolver.Injectability.resolve(
              this._moduleInstanceMap.get(target)!,
              this.context,
              propertyName
            );
          } catch (error) {
            throw locateError(
              error,
              `module "${metadata.target.name}", plugin "${propertyName}".`
            );
          }
        });
      });
    }
  }

  protected async _waitForPlugins(
    metadata: ModuleMetadata,
    propertyName: string
  ) {
    const paramIndexes = metadata.pluginParamIndexesMap.get(propertyName)!;
    return Promise.all(
      Reflector.getParamTypes(metadata.target, propertyName)
        .toSeq()
        .filter((_, index) => paramIndexes.has(index))
        .map(
          paramType =>
            new Promise(resolve => {
              this._moduleEmitter.listen(paramType, resolve);
            })
        )
        .toArray()
    );
  }

  static async run(
    target: ModuleTarget,
    context: ResolverMap = {}
  ): Promise<ModuleRunner> {
    const runner = new ModuleRunner();
    Object.assign(runner.context, context);
    runner.get(target);
    await runner.process.wait();
    return runner;
  }
}
