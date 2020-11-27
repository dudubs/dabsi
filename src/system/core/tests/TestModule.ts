import { reversed } from "../../../common/array/reversed";
import { Awaitable } from "../../../common/typings2/Async";
import { Constructor } from "../../../common/typings2/Constructor";
import { Module, Resolver } from "../../../typedi";
import { ModuleOptions } from "../../../typedi/decorators/Module";
import { ModuleRunner } from "../../../typedi/ModuleRunner";

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
    const testModuleInstance: ITestModule = testModuleRunner.get(testModule);
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
