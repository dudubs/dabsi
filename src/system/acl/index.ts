import { DbModule2 } from "@dabsi/modules2/DbModule2";
import { CliArgument, CliCommand } from "@dabsi/typecli";
import { Module } from "@dabsi/typemodule";
import AclContext from "./context";

@Module({
  dependencies: [DbModule2],
  cli: "acl",
})
export class AclModule {
  log = log.get("ACL");

  @CliArgument() protected _init(dbModule: DbModule2) {
    return dbModule.loadAndConnect();
  }

  @CliCommand("groups.show")
  async showGroups({}, { groups }: AclContext) {
    console.table(
      await groups
        .pick(["name"], { countUsers: { $count: "users" } })
        .take(1)
        .getRows()
    );
  }

  @CliCommand("groups.add", "[name]", y => y.option("name", { type: "string" }))
  async addGroup({ name }, { groups: source }: AclContext) {
    console.log(`created new group #${await source.insertKey({ name })}.`);
  }

  @CliCommand("users.add", "[loginName]", y =>
    y.option("loginName", { type: "string" })
  )
  async addUser({ loginName }, { users: source }: AclContext) {
    console.log(`created new user #${await source.insertKey({ loginName })}.`);
  }

  @CliCommand("users.update", "[login-name-or-id]", y =>
    y.option("loginName", { type: "string" })
  )
  async updateUser(
    { loginNameOrId, firstName, lastName, password },
    { users: source }: AclContext
  ) {
    const [userKey] = await source
      .filter({ $or: [{ $is: loginNameOrId }, { loginName: loginNameOrId }] })
      .take(1)
      .update({
        firstName,
        lastName,
        password,
      });

    if (userKey) {
      console.log(`user ${userKey} is updated.`);
    } else {
      console.log(`No found user like "${loginNameOrId}".`);
    }
  }

  @CliCommand("users.show") async showUsers({}, { users }: AclContext) {
    console.table(
      await users
        .take(20)
        .pick(["loginName", "firstName", "lastName"])
        .getRows()
    );
  }
}
