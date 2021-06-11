import DataContext from "@dabsi/modules/data/DataContext";
import { RequestSession } from "@dabsi/modules/session";
import { User } from "@dabsi/system/acl/entities/User";
import { Injectable } from "@dabsi/typedi";

@Injectable()
export default class AclAuthenticator {
  constructor(protected data: DataContext, protected session: RequestSession) {}

  async loginAs(user: string | { $key: string }) {
    await this.session.update({ user });
  }

  async logout() {
    await this.session.update({ user: null });
  }
}
