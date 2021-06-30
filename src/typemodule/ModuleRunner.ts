import AsyncProcess from "@dabsi/common/async/AsyncProcess";
import repeatDiff from "@dabsi/common/iterator/reapetDiff";
import { defined } from "@dabsi/common/object/defined";
import { Reflector } from "@dabsi/common/reflection/Reflector";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import ModuleMetadata from "@dabsi/typemodule/ModuleMetadata";
import { Seq } from "immutable4";
import path from "path";
import { ModuleOptions } from "webpack";
import { catchAndLocateError } from "./catchAndLocateError";
import { InstanceEmitter } from "./InstanceEmitter";

const DEBUG_LOADED_MODULES = false;

export type ModuleTarget = Function;

export interface ModuleLoaderFn {
  (target: ModuleTarget, metadata: ModuleMetadata): Awaitable;
}

export class ModuleRunner {
  static async run(
    target: ModuleTarget,
    context: ResolverMap = {}
  ): Promise<ModuleRunner> {
    const runner = new ModuleRunner();
    Object.assign(runner.context, context);
    runner.get(target);
    await runner.process.waitForLast();
    return runner;
  }

  readonly process = new AsyncProcess();

  protected _locked = false;

  readonly context: ResolverMap = Resolver.Context.flat({}, [
    this,
    this.process,
  ]);

  protected _moduleInstanceMap = new Map<ModuleTarget, any>();

  protected _loaders: ModuleLoaderFn[] = [];

  protected _moduleEmitter = new InstanceEmitter();

  protected _errors: any[] = [];

  log = log.get("RUNNER");

  get isLocked() {
    return this._locked;
  }

  getLoadedModules(): Iterable<ModuleTarget> {
    return this._moduleInstanceMap.keys();
  }

  hasInstance(target: ModuleTarget) {
    return this._moduleInstanceMap.has(target);
  }

  protected _currentLoadingModules = new Set<ModuleTarget>();

  get<T>(target: ModuleTarget | Constructor<T>): T {
    if (this._moduleInstanceMap.has(target)) {
      return this._moduleInstanceMap.get(target);
    }

    if (this._locked) {
      throw new Error(`Can't resolve module "${target.name}" after lock.`);
    }

    if (this._currentLoadingModules.has(target)) {
      throw new Error(
        `Module dependecies cycle: ${[
          this._currentLoadingModules
            .toSeq()
            .map(t => t.name)
            .join(","),
        ]}.`
      );
    }
    this._currentLoadingModules.add(target);

    const metadata = ModuleMetadata.get(target);

    // console.log("get module " + target.name);

    for (const [
      index,
      dependencyTarget,
    ] of metadata.args.dependecies.entries()) {
      catchAndLocateError(
        () => this.get(dependencyTarget),
        () => `load module ${target.name} (${index})`
      );
    }

    DEBUG_LOADED_MODULES && console.debug({ loadingModule: target.name });

    const instance = Resolver.Injectability.invoke(target, this.context);

    this._moduleInstanceMap.set(target, instance);
    this._moduleEmitter.emit(instance);

    this._loadModulePlugins(target);
    for (const loader of this._loaders) {
      this.process.push(async () => loader(target, metadata));
    }

    for (const propertyName of metadata.args.propertyPlugins) {
      const pluginType: any = defined(
        Reflector.getPropertyType(target, propertyName),
        () => `No pluginType for "${target.name}.${propertyName}".`
      );
      this._waitForModules(
        [...this.getUsedModulesByResolver(pluginType as any)],
        () => {
          instance[propertyName] = Resolver.resolve(pluginType, this.context);
        }
      );
    }

    this._currentLoadingModules.delete(target);
    return instance;
  }

  lock() {
    // lock for new modules.
    this._locked = true;
  }

  pushLoader(callback: ModuleLoaderFn) {
    if (this._locked) {
      throw new Error(`Can't pushLoader after lock.`);
    }
    this._loaders.push(callback);

    for (const target of this._moduleInstanceMap.keys()) {
      const metadata = ModuleMetadata.get(target);
      this.process.push(async () => callback(target, metadata));
    }
  }

  protected _loadModulePlugins(target: ModuleTarget) {
    const metadata = ModuleMetadata.get(target);

    for (const propertyName of metadata.args.methodPluginMap.keys()) {
      const pluginUsedModules = this._getUsedModulesByMethodPlugin(
        metadata,
        propertyName
      );

      this._waitForModules(pluginUsedModules, () => {
        this.process.catch(() =>
          Resolver.Injectability.invoke(
            this._moduleInstanceMap.get(target)!,
            this.context,
            propertyName
          )
        );
      });
    }
  }

  protected _getUsedModulesByMethodPlugin(
    metadata: ModuleMetadata,
    propertyName: string
  ) {
    return metadata.args.methodPluginMap
      .get(propertyName)!
      .toSeq()
      .flatMap(paramIndex => {
        //
        const resolver = Resolver.Injectability.getParameterResolver(
          metadata.target,
          paramIndex,
          propertyName
        );
        return catchAndLocateError(
          () => this.getUsedModulesByResolver(resolver),
          () => `Plugin<${metadata.target.name}.${propertyName}>`
        );
      })
      .toArray();
  }

  protected _waitForModules(targets: ModuleTarget[], callback: () => void) {
    let counter = targets.length;
    if (!counter) {
      return callback();
    }
    for (const target of targets) {
      this._moduleEmitter.listen(target, () => {
        counter--;
        if (!counter) {
          callback();
        }
      });
    }
  }

  addUsedModuleByResolver?: null | ((target: ModuleTarget) => void) = null;

  getUsedModulesByResolver(resolver: Resolver) {
    if (this.addUsedModuleByResolver) {
      throw new Error(`Can't override addUsedModuleByResolver.`);
    }
    const plugins = new Set<ModuleTarget>();
    this.addUsedModuleByResolver = target => {
      plugins.add(target);
    };
    try {
      Resolver.check(resolver, this.context);
    } finally {
      this.addUsedModuleByResolver = null;
    }
    return plugins;
  }
}

export class ModuleRunnerContext extends Resolver(
  [ModuleRunner],
  x => x.context
) {}
