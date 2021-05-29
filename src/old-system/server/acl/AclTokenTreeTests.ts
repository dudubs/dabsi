import { Tester } from "@dabsi/jasmine/Tester";
import { inspect } from "@dabsi/logging/inspect";
import { AclTokenTree } from "@dabsi/system-old/server/acl/AclTokenTree";
import arrayContaining = jasmine.arrayContaining;
import objectContaining = jasmine.objectContaining;

const t = Tester.beforeAll(() => ({
  tree: new AclTokenTree()
    .add("ADMIN")
    .add("ADMIN/ACL")
    .add("ADMIN/ACL/USERS/ALL")
    .add("ADMIN/FORUMS"),
})).beforeAll(t => ({
  bases: [...t.tree.getBases()],
  table: t.tree.getTable(),
}));

it("expect 'ADMIN' not will be a base-token", () => {
  expect(t.bases).not.toContain("ADMIN");
});
it("expect 'ADMIN/FORUMS' will be a base-token", () => {
  expect(t.bases).toContain("ADMIN/FORUMS");
});

testSubTokens("ADMIN", ["ADMIN/ACL/USERS/ALL", "ADMIN/FORUMS", "ADMIN/ACL"]);
testSubTokens("ADMIN", ["ADMIN/ACL/USERS/ALL"]);

function testSubTokens(token, subTokens) {
  it(`expect to sub-tokens of '${token}'`, () => {
    expect(t.table).toContain(
      arrayContaining([
        objectContaining({
          token,
          subTokens: arrayContaining(subTokens),
        }),
      ])
    );
  });
}
