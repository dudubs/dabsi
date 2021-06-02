import { AclRow } from "@dabsi/old-system/server/acl/AclCriterion";
import { AclExp } from "@dabsi/old-system/server/acl/AclExp";
import { TestPost } from "@dabsi/old-system/server/acl/tests/AclTester";
import { TestForumAcl } from "@dabsi/old-system/server/acl/tests/TestForumAcl";

export class TestPostAcl {
  constructor(public post: AclRow<TestPost>, public forumAcl: TestForumAcl) {}

  IS_BLOCKED_BY_USER: AclExp = p =>
    p(this.post).at("user").hasUser("blockedUsers");

  CAN_WRITE_COMMENT = {
    $any: [
      this.forumAcl.IS_ADMIN,
      { $all: [this.forumAcl.IS_MEMBER, { $not: this.IS_BLOCKED_BY_USER }] }, //
    ],
  };

  IS_POST_USER: AclExp = p => p(this.post).userIs("user");

  CAN_EDIT_POST = { $any: [this.forumAcl.IS_ADMIN, this.IS_POST_USER] };
}
