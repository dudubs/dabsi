import { Forward } from "@dabsi/common/reflection/Forward";
import { Reflector } from "@dabsi/common/reflection/Reflector";

@(_ => {
  // emit
})
export class A {
  @((_, __) => {}) n!: number;
  @((_, __) => {}) s!: string;
  @Forward(() => A) a;

  constructor(n: number, s: string, @Forward(() => A) a: any) {}
  method(n: number, s: string, @Forward(() => A) a: any) {}
}

it("expect to constructor types", () => {
  expect(Reflector.getParamTypes(A)).toEqual([Number, String, A]);
});
it("expect to method types", () => {
  expect(Reflector.getParamTypes(A, "method")).toEqual([Number, String, A]);
});

it("expect to property types", () => {
  expect(Reflector.getPropertyType(A, "s")).toEqual(String);
  expect(Reflector.getPropertyType(A, "n")).toEqual(Number);
  expect(Reflector.getPropertyType(A, "a")).toEqual(A);
});
