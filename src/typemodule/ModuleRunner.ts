import { AsyncProcess2 } from "@dabsi/common/async/AsyncProcess2";
import { SingleCall } from "@dabsi/common/patterns/SingleCall";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { ModuleMetadata } from "@dabsi/typemodule/ModuleMetadata";
import { Seq } from "immutable4";
import { catchAndLocateError } from "./catchAndLocateError";
import { InstanceEmitter } from "./InstanceEmitter";
import { locateError } from "./locateError";

export type ModuleTarget = Function;

export interface ModuleLoaderFn {
  (target: ModuleTarget): Awaitable;
}

export class ModuleRunner {
  static async run(
    target: ModuleTarget,
    context: ResolverMap = {}
  ): Promise<ModuleRunner> {
    const runner = new ModuleRunner();
    Object.assign(runner.context, context);
    runner.get(target);
    await runner.process.waitToEnd();
    return runner;
  }

  readonly process = new AsyncProcess2();

  protected _locked = false;

  readonly context: ResolverMap = Resolver.Context.flat({}, [
    this,
    this.process,
  ]);

  protected _moduleInstanceMap = new Map<ModuleTarget, any>();

  protected _loaders: {
    callback: ModuleLoaderFn;
    descriptor: () => string;
  }[] = [];

  protected _moduleEmitter = new InstanceEmitter();

  protected _errors: any[] = [];

  log = log.get("runner");

  get isLocked() {
    return this._locked;
  }

  get loadedModules(): ModuleTarget[] {
    return [...this._moduleInstanceMap.keys()];
  }

  get<T>(target: ModuleTarget | Constructor<T>): T {
    if (this._moduleInstanceMap.has(target)) {
      return this._moduleInstanceMap.get(target);
    }

    if (this._locked) {
      throw new Error(`Can't resolve module "${target.name}" after lock.`);
    }

    const metadata = ModuleMetadata.get(target);
    for (const [index, target] of metadata.dependencies.toSeq().entries()) {
      if (typeof target !== "function") {
        throw new Error(
          `Invalid module dependency ${metadata.target.name}, #${index}.`
        );
      }
      void this.get(target);
    }

    const instance = Resolver.Injectability.invoke(target, this.context);

    this._moduleInstanceMap.set(target, instance);
    this._moduleEmitter.emit(instance);

    this._loadModulePlugins(target);

    for (const loader of this._loaders) {
      this.process.push(
        () => `Module<${target.name}>, ${loader.descriptor()}`,
        async () => loader.callback(target)
      );
    }

    return instance;
  }

  lock() {
    // lock for new modules.
    this._locked = true;
  }

  pushLoader(descriptor: () => string, callback: ModuleLoaderFn) {
    if (this._locked) {
      throw new Error(`Can't pushLoader after lock.`);
    }
    this._loaders.push({ callback, descriptor });

    for (const target of this._moduleInstanceMap.keys()) {
      this.process.push(
        () => `${descriptor()}, Module<${target.name}>`,
        async () => callback(target)
      );
    }
  }

  protected _loadModulePlugins(target: ModuleTarget) {
    const metadata = ModuleMetadata.get(target);
    for (const propertyName of metadata.pluginParamIndexesMap.keys()) {
      const pluginUsedModules = this._getPluginUsedModules(
        metadata,
        propertyName
      );

      this._waitForModules2(pluginUsedModules, () => {
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

  protected _getPluginUsedModules(
    metadata: ModuleMetadata,
    propertyName: string
  ) {
    return metadata.pluginParamIndexesMap
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

  protected _waitForModules(targets: Iterable<ModuleTarget>) {
    return Promise.all(
      Seq.Indexed(targets).map(
        target =>
          new Promise(resolve => {
            this._moduleEmitter.listen(target, resolve);
          })
      )
    );
  }

  protected _waitForModules2(targets: ModuleTarget[], callback: () => void) {
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
