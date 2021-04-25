import { Is } from "@dabsi/common/typings2/boolean/Is";
import { Expect } from "@dabsi/common/typings2/Expect";
import { Fn } from "@dabsi/common/typings2/Fn";
import { Rpc } from "@dabsi/typerpc2";
import {
  GenericConfig2,
  Configurator,
  IsGenericConfig,
} from "@dabsi/typerpc2/GenericConfig";
import { RpcAt } from "@dabsi/typerpc2/Rpc";

//

export function RpcAtTypingTests() {
  type A = Rpc & {
    getB(xs: string): B;
    b: B;
  };
  type B = Rpc & {
    c: C;
    getC(): C;
  };
  type C = Rpc & {
    a: A;
    getA(): A;
  };

  type _ = [
    ///
    Expect<C, RpcAt<A, "b.c">>,
    Expect<never, RpcAt<A, "b.x">>,
    Expect<A, RpcAt<A, "b.c.a">>,
    Expect<A, RpcAt<A, "b.c.getA">>,
    Expect<never, RpcAt<A, "b.c.getA.x">>
  ];
}
export async function ConfigTypingsTests() {
  let GC1: GenericConfig2<
    <T extends Fn>(o: {
      type: T;
      value: ReturnType<T>;
    }) => { type: Fn; value: any }
  >;

  let GC1WithArgs: GenericConfig2<
    <T extends Fn>(o: {
      type: T;
      value: ReturnType<T>;
    }) => { type: Fn; value: any },
    [{ xs: string; xi: number }]
  >;

  let GC2: GenericConfig2<
    <T extends Fn>(o: {
      type: T;
      value: ReturnType<T>;
    }) => { typeAndValue: [Fn, any] }
  >;

  let GC2WithArgs: GenericConfig2<
    <T extends Fn>(o: {
      type: T;
      value: ReturnType<T>;
    }) => { typeAndValue: [Fn, any] },
    [{ xs: string; xi: number }]
  >;

  // GenericConfigTests
  {
    GC1 = $ => $({ type: String, value: "hello" });

    GC1WithArgs = ($, p) => $({ type: String, value: p.xs });

    GC1WithArgs = ($, p) =>
      $({
        type: String,
        // @ts-expect-error
        value: p.xi,
      });

    GC1 = $ =>
      $({
        type: String,
        // @ts-expect-error
        value: 123,
      });

    GC2 = $ => $({ type: String, value: "hello" });

    // @ts-expect-error
    GC2 = $ => $({ type: String, value: 123 });

    (await GenericConfig2(GC1)).type;

    (await GenericConfig2(GC1WithArgs, [{ xs: "", xi: 0 }])).type;

    // @ts-expect-error
    (await GenericConfig2(GC1)).x;

    (
      await GenericConfig2(GC2, ({ type, value }) => ({
        typeAndValue: [type, value],
      }))
    ).typeAndValue;

    (
      await GenericConfig2(GC2, ({ type, value }) => ({
        // @ts-expect-error
        typeAndValue: [type],
      }))
    ).typeAndValue;

    (
      await GenericConfig2(
        GC2WithArgs!,
        [{ xs: "", xi: 1 }],
        ({ type, value }) => ({
          typeAndValue: [type, value],
        })
      )
    ).typeAndValue;

    // @ts-expect-error
    await GenericConfig2(GC2WithArgs!, ({ type, value }) => ({
      typeAndValue: [type, value],
    }));

    {
      // @ts-expect-error
      const { x } = await GenericConfig2(
        GC2WithArgs!,
        [{ xs: "", xi: 1 }],
        ({ type, value }) => ({
          typeAndValue: [type, value],
        })
      );
    }
  }

  // ConfiguratorTests
  {
    //

    type _ = [
      //
      Expect<true, Is<() => any, GenericConfig2<any>>>,
      Expect<false, IsGenericConfig<() => any>>
    ];

    let CO_GC1: Configurator<typeof GC1>;
    let CO_GC2: Configurator<typeof GC2>;
    let CO_C1: Configurator<{ xs: string }>;
    let CO_C2: Configurator<($: (any) => any) => any>;

    CO_GC1 = GC1;

    // @ts-expect-error
    CO_GC1 = $ => $(GC1);

    CO_GC2 = GC2;

    CO_C1 = { xs: "" };

    // @ts-expect-error
    CO_C1 = { xs: 123 };

    CO_C1 = $ => $({ xs: "" });

    CO_C1 = async $ => $({ xs: "" });

    // @ts-expect-error
    CO_C1 = async $ => $({ xs: 123 });

    CO_C2 = () => 1;

    CO_C2 = async $ => $(() => 1);
  }
}
