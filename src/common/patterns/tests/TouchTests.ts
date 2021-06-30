import Touch from "@dabsi/common/patterns/Touch";

let counter = 0;

class A {
  @Touch() test(x) {
    return ++counter;
  }
}

const a = new A();
const b = new A();

it("", () => {
  expect(a.test(1)).toEqual(a.test(1));
  expect(a.test(1)).not.toEqual(a.test(2));
  expect(a.test(1)).not.toEqual(b.test(1));

  expect([...Touch.getMap(a, "test")!.keys()]).toEqual([1, 2]);
  expect([...Touch.getMap(b, "test")!.keys()]).toEqual([1]);
});
