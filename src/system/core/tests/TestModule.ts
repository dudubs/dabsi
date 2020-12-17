import { reversed } from "@dabsi/common/array/reversed";
import { Awaitable } from "@dabsi/common/typings2/Async";
import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Module, Resolver } from "@dabsi/typedi";
import { ModuleOptions } from "@dabsi/typedi/decorators/Module";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";

export interface ITestModule {
  beforeAll?(): Awaitable;

  afterAll?(): Awaitable;
}

let testModules = new Set<Module>();

export function TestModule(options: ModuleOptions = {}) {
  return (module: Constructor<any>) => {
    testModules.add(module);
    Module(options)(module);
  };
}

let testModulesInstances: any[] = [];
const testModuleRunner = new ModuleRunner();
TestModule.context = testModuleRunner.context;
TestModule.resolve = <T>(resolver: Resolver<T>): T =>
  Resolver.checkAndResolve(resolver, testModuleRunner.context);

beforeAll(async () => {
  for (const testModule of testModules) {
    const testModuleInstance: ITestModule = testModuleRunner.getModuleInstance(
      testModule
    );
    testModulesInstances.push(testModuleInstance);
    console.log(testModuleInstance.constructor);
    await testModuleInstance.beforeAll?.();
  }
});
afterAll(async () => {
  for (let child of reversed(testModulesInstances)) {
    await child.afterAll?.();
  }
});
