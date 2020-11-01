import { Connection } from "typeorm";
import { AclCriterion, AnyAclCriterion } from "./AclCriterion";
import { AclPrivilege } from "./AclPrivilege";

export class AclRequest extends AclPrivilege {
  constructor(public connection: Connection) {
    super();
  }

  async ask(userKey: string) {
    const parameters: any[] = [];

    const allowQuery = this.allowCriterions
      .toSeq()
      .map(
        criterion =>
          AclCriterion.getQueryAndParameters(
            this.connection,
            criterion,
            userKey,
            parameters
          )[0]
      )
      .join(" AND ");

    const denyQuery = this.denyCriterions
      .toSeq()
      .map(
        criterion =>
          AclCriterion.getQueryAndParameters(
            this.connection,
            criterion,
            userKey,
            parameters
          )[0]
      )
      .join(" OR ");

    return this.connection
      .query(`SELECT NOT (${denyQuery}) AND ((${allowQuery})) cx`, parameters)
      .then(rows => {
        return !!rows[0].cx;
      });
  }
}
