import { DataExp } from "../../../../typedata/data-exp/DataExp";
import { DataRow } from "../../../../typedata/DataRow";
import { AclRow } from "../AclCriterion";
import { AclExp } from "../AclExp";
import { TestForum, TestForumMember, TestForumMemberMode } from "./AclTester";

export const TEST_FORUMS_ADMIN_TOKEN = "FORUMS/ADMIN";
export const TEST_GOD_TOKEN = "GOD";

export class TestForumAcl {
  constructor(public forum: AclRow<TestForum>) {}

  asMember(exp: DataExp<TestForumMember>): AclExp {
    return p => p(this.forum).hasAt("members").userIs("user").filter(exp);
  }

  IS_ADMIN: AclExp = {
    $any: [
      TEST_FORUMS_ADMIN_TOKEN,
      TEST_GOD_TOKEN,
      this.asMember({
        mode: TestForumMemberMode.admin,
      }),
    ],
  };

  IS_MEMBER = this.asMember({
    mode: { $notEquals: TestForumMemberMode.blocked },
  });

  IS_BLOCKED = this.asMember({
    mode: TestForumMemberMode.blocked,
  });

  IS_ADMIN_OR_MEMBER = { $any: [this.IS_ADMIN, this.IS_MEMBER] };

  CAN_WRITE_POST = this.IS_ADMIN_OR_MEMBER;
}