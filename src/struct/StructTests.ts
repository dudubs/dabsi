import { Field } from ".";
import { Struct } from "@dabsi/struct";

describe("primitive in struct", () => {
  const s = Struct({
    xs: "hello",
    xns: String,
  });

  it("", () => {
    expect(s({})).toEqual(
      jasmine.objectContaining({
        xs: "hello",
        xns: undefined,
      })
    );

    expect(s({ xs: "world" })).toEqual(
      jasmine.objectContaining({
        xs: "world",
      })
    );
  });
  it("expect to string", () => {
    expect(s({ xns: 10 })).toEqual(
      jasmine.objectContaining({
        xns: "10",
      })
    );
  });
});
it("struct in struct", () => {
  const a = Struct({ xs: "hello" });
  const b = Struct({
    a: a({}),
  });

  expect(b()).toEqual(
    jasmine.objectContaining({
      a: jasmine.objectContaining({
        xs: "hello",
      }),
    })
  );

  expect(b({ a: { xs: "world" } })).toEqual(
    jasmine.objectContaining({
      a: jasmine.objectContaining({
        xs: "world",
      }),
    })
  );
});
describe("array in struct", () => {
  const b = Struct({
    items: Field.array(
      Struct({
        xs: "hello",
      })
    ),
  });

  it("", () => {
    expect(b()).toEqual(
      jasmine.objectContaining({
        items: [],
      })
    );
  });
  it("expect to string", () => {
    expect(b({ items: [{ xs: 10 }] })).toEqual(
      jasmine.objectContaining({
        items: jasmine.arrayContaining([
          jasmine.objectContaining({
            xs: "10",
          }),
        ]),
      })
    );
  });
});
