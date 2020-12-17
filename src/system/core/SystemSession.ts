import { Session } from "@dabsi/system-old/server/acl/Session";
import { DataSelector } from "@dabsi/typedata/DataSelector";

export class SystemSession extends DataSelector(Session, {
  pick: [],
  relations: {
    user: {
      pick: [],
    },
  },
} as const) {}
