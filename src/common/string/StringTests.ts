import fromConstantCase from "./fromConstantCase";
import toTitleCase from "@dabsi/common/string/toTitleCase";

it("fromConstantCase", () => {
  expect([...fromConstantCase("HELLO_WORLD")]).toEqual(["HELLO", "WORLD"]);
});

it("toTitleCase", () => {
  expect(toTitleCase(["HELLO", "WORLD"])).toEqual("Hello World");
});
