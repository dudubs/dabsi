import addAll from "@dabsi/common/map/addAll";
import DataSystemModule from "@dabsi/system/core/DataSystemModule";
import { DbModule } from "@dabsi/system/core/DbModule";
import TestDbModule from "@dabsi/system/core/tests/TestDbModule";
import DataSourceResolver from "@dabsi/typedata/data-entity/DataSourceResolver";
import { Resolver } from "@dabsi/typedi";
import TestEntities, {
  AEntity,
} from "../../typeorm/relations/tests/TestEntities";
import { DataEntityEvent } from "./../../typedata/data-entity/DataEntitySource";
import { ModuleRunner } from "./../../typedi/ModuleRunner";

const events: DataEntityEvent[] = [];
beforeAll(async () => {
  const runner = new ModuleRunner();

  const dbm = runner.getModuleInstance(DbModule);
  const dsm = runner.getModuleInstance(DataSystemModule);
  runner.getModuleInstance(TestDbModule);

  addAll(dbm.entityTypes, TestEntities);

  dsm.listenToEntity(AEntity, "beforeDeleteAll", event => {
    event.select({ pick: ["aText"] });
  });

  dsm.listenToEntity(AEntity, "beforeUpdateAll", event => {
    event.select({ pick: ["aText"] });
  });

  dsm.listenToEntity(AEntity, "*", event => {
    events.push(event);
  });

  await dbm.init();

  const getDataSource = Resolver.resolve(DataSourceResolver, runner.context);

  const a = await getDataSource(AEntity).insert({
    aText: "hello",
  });
  await a.update({ aText: "world" });

  await a.delete();
});

it("expect to update event", () => {
  expect(events).toContain(
    jasmine.objectContaining({
      type: "beforeUpdateOne",
      entity: jasmine.objectContaining({
        aText: "hello",
      }),
    })
  );
});

it("expect to delete event", () => {
  expect(events).toContain(
    jasmine.objectContaining({
      type: "beforeDeleteOne",
      entity: jasmine.objectContaining({
        aText: "world",
      }),
    })
  );
});

it("expect to insert event", () => {
  expect(events).toContain(
    jasmine.objectContaining({
      type: "insert",
      changeMap: jasmine.objectContaining({
        aText: jasmine.objectContaining({
          value: "hello",
        }),
      }),
    })
  );
});
