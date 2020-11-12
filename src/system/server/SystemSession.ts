import { DataSelector } from "../../typedata/DataSelector";
import { Session } from "./acl/Session";

export class SystemSession extends DataSelector(Session, {
  pick: [],
  relations: {
    user: {
      pick: [],
    },
  },
} as const) {}
