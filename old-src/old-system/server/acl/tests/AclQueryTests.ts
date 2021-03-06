import { mapObjectAsync } from "@dabsi/common/object/mapObject";
import { Awaited } from "@dabsi/common/typings2/Async";
import { AclQuery } from "@dabsi/old-system/server/uac/AclQuery";
import { AclTester } from "@dabsi/old-system/server/uac/tests/AclTester";
import {
  TestForumAcl,
  TEST_FORUMS_ADMIN_TOKEN,
  TEST_GOD_TOKEN,
} from "@dabsi/old-system/server/uac/tests/TestForumAcl";
import { TestPostAcl } from "@dabsi/old-system/server/uac/tests/TestPostAcl";
import { User } from "@dabsi/system/uac/entities/User";
import { DataRow } from "@dabsi/typedata/row";

const t = AclTester.beforeAll(async t => {
  const forumAcl = new TestForumAcl(t.forum);
  const postAcl = new TestPostAcl(t.postByMember, forumAcl);

  type Review = Awaited<ReturnType<typeof getReview>>;

  return {
    reviews: (await mapObjectAsync(t.users as any, user =>
      getReview(user as any)
    )) as Record<keyof typeof t.users, Review>,
  };

  function getReview(user: DataRow<User>) {
    //
    return new AclQuery(t.connection).askFor(user.$key).askMap({
      IS_FORUM_MEMBER: forumAcl.IS_MEMBER,
      IS_FORUM_ADMIN: forumAcl.IS_ADMIN,

      IS_BLOCKED_BY_FORUM: forumAcl.IS_BLOCKED,
      IS_BLOCKED_BY_POST_USER: postAcl.IS_BLOCKED_BY_USER,

      CAN_WRITE_FORUM_POST: forumAcl.CAN_WRITE_POST,
      CAN_WRITE_COMMENT: postAcl.CAN_WRITE_COMMENT,
      CAN_EDIT_POST: postAcl.CAN_EDIT_POST,

      IS_ADMIN_TOKEN: "ADMIN",
      IS_GOD: TEST_GOD_TOKEN,
      IS_FORUMS_ADMIN: TEST_FORUMS_ADMIN_TOKEN,

      IS_ADMIN_FIRST_NAME: {
        $user: { firstName: "admin" },
      },
    });
  }
});

it("expect admin to be FORUM_ADMIN_MEMBER", () => {
  expect(t.reviews.admin.IS_FORUM_ADMIN).toBeTrue();
});
it("expect admin to be FORUM_MEMBER", () => {
  expect(t.reviews.admin.IS_FORUM_MEMBER).toBeTrue();
});
it("expect blockedByForum to not be FORUM_MEMBER", () => {
  expect(t.reviews.blockedByForum.IS_FORUM_MEMBER).toBeFalse();
});
describe("test $user exp:", () => {
  it("expect 'admin' first-name will be 'admin'", () => {
    expect(t.reviews.admin.IS_ADMIN_FIRST_NAME).toBeTrue();
  });
  it("expect 'member' last name not will be 'admin'", () => {
    expect(t.reviews.member.IS_ADMIN_FIRST_NAME).toBeFalse();
  });
});
it("expect 'blockedByMember' can't write comment", () => {
  expect(t.reviews.blockedByMember.CAN_WRITE_COMMENT).toBeFalse();
});
it("expect 'adminBlockedByMember' can write comment", () => {
  expect(t.reviews.adminBlockedByMember.CAN_WRITE_COMMENT).toBeTrue();
});
it("expect 'otherMember' can write comment", () => {
  expect(t.reviews.otherMember.CAN_WRITE_COMMENT).toBeTrue();
});
it("expect 'god' to be god", () => {
  expect(t.reviews.god.IS_GOD).toBeTrue();
});
it("expect 'adminBlockedByMember' to can write post comment", () => {
  expect(t.reviews.adminBlockedByMember.CAN_WRITE_COMMENT).toBeTrue();
});
it("expect 'admin' can edit post", () => {
  expect(t.reviews.adminBlockedByMember.CAN_EDIT_POST).toBeTrue();
  expect(t.reviews.forumsAdmin.CAN_EDIT_POST).toBeTrue();
  expect(t.reviews.god.CAN_EDIT_POST).toBeTrue();
  expect(t.reviews.member.CAN_EDIT_POST).toBeTrue();
  expect(t.reviews.otherMember.CAN_EDIT_POST).toBeFalse();
});
