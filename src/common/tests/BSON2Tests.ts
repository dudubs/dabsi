import { BSON2 } from "@dabsi/common/BSON2";

it("expected to array", () => {
  expect(BSON2.unpack(BSON2.pack(["hello"]))).toEqual(["hello"]);
});
