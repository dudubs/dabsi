import { Constructor } from "@dabsi/common/typings2/Constructor";
import { CallStackInfo } from "@dabsi/typedi/CallStackInfo";

import { Injectable } from "@dabsi/typedi/decorators/Injectable";
import { Resolver } from "@dabsi/typedi/index";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { Consumer } from "@dabsi/typedi/operators/consume";

import { ResolverContext, ResolverType } from "@dabsi/typedi/Resolver";

let lastModule: Function | null = null;

export type ModuleTarget = Constructor<any>;

export const getLastModule = () => lastModule;

export type ModuleProvider = Resolver<ResolverContext>;

export const ModuleProvider: Consumer<ResolverType<ModuleProvider>> =
  Resolver.consume;

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

    Object.defineProperty(target, Resolver.resolveSymbol, {
      configurable: false,
      value(context) {
        return Resolver.resolve(ModuleRunner, context).resolveInstance(this);
      },
    });

    target[Resolver.checkSymbol] = function (context) {
      Resolver.check(ModuleRunner, context);
    };
  };
}

export function isModuleTarget(obj): obj is ModuleTarget {
  return moduleMetadataMap.has(obj);
}
