import { DataContext } from "@dabsi/modules/data/context";
import { Session } from "@dabsi/modules/session/entities/Session";
import { DataSource } from "@dabsi/typedata/source";
import { Injectable } from "@dabsi/typedi";

@Injectable()
export class SessionContext {
  constructor(protected data: DataContext) {}

  get sessions(): DataSource<Session> {
    return this.data.getSource(Session);
  }
}
