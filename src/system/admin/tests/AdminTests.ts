import { getRootTokens } from "@dabsi/system/admin/server/getRootTokens";

testm(__filename, () => {
  it("getRootTokens", () => {
    expect([...getRootTokens(["a"])]).toEqual(["a"]);
    expect([...getRootTokens(["a", "b"])]).toEqual(["a/*", "a/b"]);
    expect([...getRootTokens(["a", "b", "c"])]).toEqual([
      "a/*",
      "a/b/*",
      "a/b/c",
    ]);
  });
});
