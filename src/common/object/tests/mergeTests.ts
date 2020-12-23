import { merge, merger } from "@dabsi/common/object/merge";

const o = {
  xi: 1,
  sa: ["hello"],
  xs: "hello",
  s: {
    xi: 1,
    xb: false,
  },
};

it("simple assign", () => {
  expect(merge({ xs: "hello", xi: 1 }, { xs: "world" })).toEqual({
    xs: "world",
    xi: 1,
  });
});

it("$merge to object", () => {
  expect(
    merge(o, {
      xs: "world",
      s: merger({
        xi: 2,
      }),
    })
  ).toEqual({
    ...o,
    xs: "world",
    s: {
      ...o.s,
      xi: 2,
    },
  });
});

it("$merge to function", () => {
  expect(merge(o, { sa: sa => [...sa, "world"] })).toEqual({
    ...o,
    sa: ["hello", "world"],
  });
});
