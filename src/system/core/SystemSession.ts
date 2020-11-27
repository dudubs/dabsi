import { Session } from "../../system-old/server/acl/Session";
import { DataSelector } from "../../typedata/DataSelector";

export class SystemSession extends DataSelector(Session, {
  pick: [],
  relations: {
    user: {
      pick: [],
    },
  },
} as const) {}
