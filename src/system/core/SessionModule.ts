import { Session } from "@dabsi/system/core/entities/SystemSession";
import { DbModule } from "@dabsi/system/core/DbModule";
import { DataSelectionRow } from "@dabsi/typedata/data-selection/DataSelectionRow";
import { DataRow } from "@dabsi/typedata/DataRow";
import { Module } from "@dabsi/typedi";

export type SessionRow = DataRow<DataSelectionRow<Session, { pick: [] }>>;

@Module({
  dependencies: [DbModule],
})
export class SessionModule {
  // TODO: cli
}
