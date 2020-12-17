import { inspect } from "@dabsi/logging/inspect";
import { CallStackInfo } from "./../CallStackInfo";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Consumer } from "@dabsi/typedi/Consumer";
import { Injectable } from "@dabsi/typedi/decorators/Injectable";
import { Resolver } from "@dabsi/typedi/index";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { checkResolverSymbol } from "@dabsi/typedi/operators/checkResolver";
import { resolveSymbol } from "@dabsi/typedi/resolve";
import { ResolverType } from "@dabsi/typedi/Resolver";
import { AnyResolverMap } from "@dabsi/typedi/resolvers/ObjectResolver";

let lastModule: Function | null = null;

export type ModuleTarget = Constructor<any>;

export const getLastModule = () => lastModule;

export type ModuleProvider = Resolver<AnyResolverMap>;

export const ModuleProvider: Consumer<ResolverType<ModuleProvider>> = Consumer;
export type ModuleMetadata = { callStackInfo: CallStackInfo } & ModuleOptions;

export const moduleMetadataMap = new WeakMap<ModuleTarget, ModuleMetadata>();

export type ModuleOptions = {
  dependencies?: ModuleTarget[];
  providers?: ModuleProvider[];
};

export function Module(options: ModuleOptions = {}) {
  const callStackInfo = new CallStackInfo(new Error(), __filename);
  return (target: ModuleTarget) => {
    lastModule = target;

    moduleMetadataMap.set(target, { ...options, callStackInfo });

    Injectable()(target);

    Object.defineProperty(target, resolveSymbol, {
      configurable: false,
      value(context) {
        return Resolver.resolve(ModuleRunner, context).getModuleInstance(this);
      },
    });

    target[checkResolverSymbol] = function (context) {
      Resolver.check(ModuleRunner, context);
    };
  };
}
