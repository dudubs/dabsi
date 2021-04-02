import { Forward } from "@dabsi/common/reflection/Forward";

class A {
  @Forward(() => Number) n;

  constructor(
    @Forward(() => Number)
    n
  ) {}

  m(
    @Forward(() => Number)
    n
  ) {}
}

it("expect constructor parameter #0 will be a Number.", () => {
  expect(Forward.getParameterType(A, 0)).toBe(Number);
});

it("expect method parameter #0 will be a Number", () => {
  expect(Forward.getParameterType(A, 0, "m")).toBe(Number);
});

it("expect property 'n' willb e a Number.", () => {
  expect(Forward.getPropertyType(A, "n")).toBe(Number);
});
