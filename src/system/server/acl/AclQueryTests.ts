import { DataExp } from "../../../typedata/data-exp/DataExp";
import { AclExp } from "./AclExp";
import { AclQuery } from "./AclQuery";
import { AclTester, ForumMember, ForumMemberMode } from "./AclTester";

const t = AclTester;

describe(__filename, () => {
  const createForumAclExp = (exp: DataExp<ForumMember>): AclExp => $criterion =>
    $criterion(t.forum).hasAt("members").userIs("user").filter(exp);

  const IS_FORUM_BLOCKED_MEMBER = createForumAclExp({
    mode: ForumMemberMode.blocked,
  });

  const IS_FORUM_ADMIN_MEMBER = createForumAclExp({
    mode: ForumMemberMode.admin,
  });

  const IS_FORUM_REGULAR_MEMBER = createForumAclExp({
    mode: { $notEquals: ForumMemberMode.blocked },
  });

  const IS_FORUM_ADMIN: AclExp = {
    $any: [
      IS_FORUM_ADMIN_MEMBER, //
      "ADMIN/FORUMS",
      // p=>p(forum).is()
    ],
  };

  it("", async () => {
    console.log(
      await new AclQuery(t.connection).askFor(t.member.$key).askMap({
        IS_ADMIN: "ADMIN",
        IS_FORUMS_ADMIN: "ADMIN/FORUMS",
        // IS_FORUMS_ADMIN_X: "ADMIN/FORUMS/X",
        XXX: {
          $all: [1].flatMap(i =>
            [1].flatMap(x => [1].flatMap(z => [i + "XX" + z + "XX" + x]))
          ),
        },
      })
    );
  });
});
