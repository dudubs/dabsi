import { CliCommand } from "@dabsi/typecli";
import { CliBuilder } from "@dabsi/typecli/CliBuilder";
import { CliModule2 } from "@dabsi/typecli/CliModule";
import { Injectable } from "@dabsi/typedi";
import { Module } from "@dabsi/typemodule";
import { ModuleRunner, ModuleTarget } from "@dabsi/typemodule/ModuleRunner";
import yargs from "yargs";

describe("CliBuilder", () => {
  let b: CliBuilder;

  beforeEach(() => {
    b = new CliBuilder(p => {
      p();
    });
  });

  it("expect to run command", done => {
    b.touch("test").runners.push(() => {
      done();
    });
    b.build(yargs(["test"])).argv;
  });

  it("expect to run wrapper", async () => {
    const wrapperSpy = jasmine.createSpy();
    const runSpy = jasmine.createSpy();
    b.wrappers.push(async (args, execute) => {
      wrapperSpy();
      await execute();
    });
    b.touch("test").runners.push(args => {
      runSpy();
    });
    b.build(yargs(["test"])).argv;
    expect(wrapperSpy).toHaveBeenCalled();
    expect(runSpy).toHaveBeenCalled();
  });
});

describe("CliRunner", () => {
  const run = async (m: ModuleTarget, args: string[]) => {
    const moduleRunner = new ModuleRunner();
    const cliModule = moduleRunner.get(CliModule2);
    moduleRunner.get(m);
    moduleRunner.process.waitAndPush(async () => {
      cliModule.run(args);
    });
  };

  it("expect to inject and run command.", async done => {
    @Injectable()
    class X {}

    @Module()
    class A {
      @CliCommand("test", y => y.string("hello").default("hello", "world"))
      doTest({ hello }, x: X) {
        expect(x).toBeInstanceOf(X);
        expect(hello).toEqual("world");
        done();
      }
    }
    await run(A, ["test"]);
  });
});
