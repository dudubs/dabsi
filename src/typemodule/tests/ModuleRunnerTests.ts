import { Inject, Injectable, Resolver } from "@dabsi/typedi";
import { Module, Plugin } from "@dabsi/typemodule";
import { ModuleRunner } from "@dabsi/typemodule/ModuleRunner";

it("expect to create dependencies.", done => {
  @Module()
  class A {
    constructor() {
      done();
    }
  }

  @Module({ dependencies: [A] })
  class B {}

  ModuleRunner.run(B);
});

it("expect to inject dependencies.", done => {
  @Module()
  class A {}

  @Module()
  class B {
    constructor(a: A) {
      expect(a).toBeInstanceOf(A);
      done();
    }
  }

  ModuleRunner.run(B);
});

it("expect to inject resolvers.", done => {
  @Injectable()
  class X {}

  @Module()
  class A {
    constructor(x: X) {
      expect(x).toBeInstanceOf(X);
      done();
    }
  }

  ModuleRunner.run(A);
});

it("expect to load modules", async () => {
  const events: any[] = [];
  @Module()
  class A {
    constructor(moduleRunner: ModuleRunner) {
      //
      moduleRunner.pushLoader(target => {
        events.push(`LOAD_${target.name}_BY_${this.constructor.name}`);
      });
    }
  }
  @Module({
    dependencies: [A],
  })
  class B {
    constructor(moduleRunner: ModuleRunner) {
      //
      moduleRunner.pushLoader(target => {
        events.push(`LOAD_${target.name}_BY_${this.constructor.name}`);
      });
    }
  }
  await ModuleRunner.run(B);
  expect(events).toEqual([
    "LOAD_A_BY_A",
    "LOAD_A_BY_B",
    "LOAD_B_BY_A",
    "LOAD_B_BY_B",
  ]);
});

it("expect to load plugins", async () => {
  let installedC = false;

  @Module()
  class A {}

  @Module()
  class B {}

  @Module()
  class C {}

  @Module({
    dependencies: [C],
  })
  class D {
    installA(
      @Plugin()
      a: A,
      b: B
    ) {
      fail();
    }

    installC(
      @Plugin()
      c: C,
      b: B
    ) {
      installedC = true;

      expect(c).toBeInstanceOf(C);
      expect(b).toBeInstanceOf(B);
    }
  }

  await ModuleRunner.run(D);

  !installedC && fail({ installedC });
});

it("expect to get resolver plugins.", () => {
  //
  @Module()
  class A {}

  @Module()
  class B {}

  @Module()
  class C {}

  const moduleRunner = new ModuleRunner();

  expect([
    ...moduleRunner.getUsedModulesByResolver(
      Resolver(
        [
          A,
          Resolver.object({
            b: B,
            c: Resolver([C], c => c),
          }),
        ],
        () => null
      )
    ),
  ]).toEqual([A, B, C]);
});

it("expect to install context", () => {
  class X {
    constructor(readonly n: number) {}
  }

  @Module()
  class A {
    installContext(@Plugin() @Inject(c => c) context: any) {
      Resolver.Context.assign(context, [new X(123)]);
    }
  }

  @Module({ dependencies: [A] })
  class B {
    constructor(readonly x: X) {}
  }

  const mr = new ModuleRunner();
  expect(mr.get(B).x.n).toEqual(123);
});

it("expect to optional plugin", async () => {
  //

  @Module()
  class A {}

  @Module()
  class B {
    @Plugin() a?: A;
  }

  const mr = new ModuleRunner();
  const b = mr.get(B);
  expect(b.a).toBeUndefined();
  await mr.process.wait();

  const a = mr.get(A);
  await mr.process.wait();
  expect(b.a).toBe(a);
});
