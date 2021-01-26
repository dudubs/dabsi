import { Session } from "./entities/Session";

import { DataSelector } from "@dabsi/typedata/selector";

export default class RequestSession extends DataSelector(Session, {
  pick: [],
  relations: {
    user: {
      pick: [],
    },
  },
} as const) {}
