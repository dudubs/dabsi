import DataContext from "@dabsi/modules/data/DataContext";
import { RequestSession } from "@dabsi/modules/session";
import { User } from "@dabsi/system/uac/entities/User";
import { Injectable } from "@dabsi/typedi";

@Injectable()
export default class UacAuthenticator {
  constructor(protected data: DataContext, protected session: RequestSession) {}

  async loginAs(user: string | { $key: string }) {
    await this.session.update({ user });
  }

  async logout() {
    await this.session.update({ user: null });
  }
}
