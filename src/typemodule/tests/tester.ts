import { Constructor } from "@dabsi/common/typings2/Constructor";
import { Tester } from "@dabsi/jasmine/Tester";
import { Module } from "@dabsi/typemodule";
import { ModuleRunner, ModuleTarget } from "@dabsi/typemodule/ModuleRunner";

export type Module2Tester = ReturnType<typeof Module2Tester>;

export function Module2Tester<T>(target: Constructor<T>) {
  return Tester.beforeAll(async () => {
    const runner = new ModuleRunner();

    const instance: T = runner.get(target);

    await runner.process.wait();

    return {
      runner,
      instance,
    };
  });
}
