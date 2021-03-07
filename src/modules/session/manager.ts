import { DataContext } from "@dabsi/modules/data/context";
import { Session } from "@dabsi/modules/session/entities/Session";
import {
  getEntityMetadata,
  getRelationMetadatasTo,
} from "@dabsi/typedata/entity/typeormMetadata";
import { Injectable } from "@dabsi/typedi";
import { Connection, EntityMetadata } from "typeorm";

export const SESSION_TIMEOUT = 1000 * 60 * 10;
export const COUNT_TIMEOUT = 1000 * 60;

const PAGE_SIZE = 100;

@Injectable()
export class SessionManager {
  constructor(protected data: DataContext, protected connection: Connection) {}

  sessions = this.data.getSource(Session);

  async getCountTimeoutSessions() {
    return this.sessions
      .filter({
        timeout: { $lessThan: this.getCurrentTime() - SESSION_TIMEOUT },
      })
      .getCountRows();
  }

  sessionMetadata: EntityMetadata = getEntityMetadata(this.connection, Session);

  protected getCurrentTime(): number {
    return new Date().getTime();
  }

  async deleteTimeoutSessions() {
    await this.sessions
      .filter({
        timeout: { $lessThan: this.getCurrentTime() - SESSION_TIMEOUT },
      })
      .take(PAGE_SIZE)
      .delete();
  }
}
