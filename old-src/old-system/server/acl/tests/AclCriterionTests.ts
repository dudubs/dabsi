import {
  AclCriterion,
  AclCriterionExps,
} from "@dabsi/old-system/server/acl/AclCriterion";
import {
  TestForum,
  TestForumMemberMode,
} from "@dabsi/old-system/server/acl/tests/AclTester";
import anything = jasmine.anything;
import arrayContaining = jasmine.arrayContaining;

it("sanity", () => {
  expect(
    AclCriterion.create([TestForum, "f1"])
      .filter({ $count: "members" })
      .hasAt("members")
      .filter({ mode: TestForumMemberMode.admin })
      .userIs("user")
      .getFilter(new AclCriterionExps("u1")) as any
  ).toEqual({
    $and: [
      { $count: "members" },
      {
        $has: {
          members: {
            $and: arrayContaining([
              { mode: anything() },
              { $at: { user: { $is: "u1" } } },
            ]),
          },
        },
      },
    ],
  });
});
