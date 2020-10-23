import exp from "constants";
import { Consumer } from "../Consumer";
import { Provider } from "../Provider";
import { Resolver } from "../Resolver";

testm(__filename, () => {
  const r1 = Resolver<string>();

  it("expect to throw resolve for empty context", () => {
    expect(() => Resolver.check(r1, {})).toThrowError();
  });
  it("expect to resolve for context", () => {
    expect(
      Resolver.checkAndResolve(r1, {
        ...r1.provide("hello"),
      })
    ).toEqual("hello");
  });
  it("expect to resolve by parent context", () => {
    expect(
      Resolver.checkAndResolve(
        Provider({
          ...r1.provide("hello"),
        })(r1),
        {}
      )
    ).toEqual("hello");
  });
  it("expect to resolve by nearest context", () => {
    expect(
      Resolver.checkAndResolve(
        Provider({
          ...r1.provide("hello"),
        })(
          Provider({
            ...r1.provide("world"),
          })(r1)
        ),
        {}
      )
    ).toEqual("world");
  });

  abstract class MyAbstractType {
    abstract foo(): void;

    bar() {
      //
    }
  }

  class MyType extends MyAbstractType {
    foo() {}
  }

  it("expect to throw error for empty context", () => {
    expect(() => Resolver.checkAndResolve([MyType])).toThrowError();
  });

  it("expect to resolve type", () => {
    expect(
      Resolver.checkAndResolve(
        [MyType],
        MyType.provide(() => new MyType())
      )
    ).toBeInstanceOf(MyType);
  });

  it("expect to resolve abstract type", () => {
    expect(
      Resolver.checkAndResolve(
        [MyAbstractType],
        MyType.provide(() => new MyType())
      )
    ).toBeInstanceOf(MyAbstractType);
  });

  it("expect to consume resolver", () => {
    expect(
      Resolver.checkAndResolve(
        Consumer([r1], name => `Hello ${name}!`),
        r1.provide("World")
      )
    ).toEqual("Hello World!");
  });
});
