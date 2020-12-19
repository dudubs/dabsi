import { Session } from "@dabsi/system/core/entities/SystemSession";

import { DataSelector } from "@dabsi/typedata/DataSelector";

export class SystemSession extends DataSelector(Session, {
  pick: [],
  relations: {
    user: {
      pick: [],
    },
  },
} as const) {}
