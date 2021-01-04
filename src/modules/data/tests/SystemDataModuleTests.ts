import addAll from "@dabsi/common/map/addAll";
import DataModule from "@dabsi/modules/data";
import { DbModule } from "@dabsi/modules/DbModule";
import TestDbModule from "@dabsi/modules/tests/TestDbModule";
import DataSourceFactoryResolver from "@dabsi/modules/data/DataSourceFactroyResolver";
import { Resolver } from "@dabsi/typedi";
import TestEntities, {
  AEntity,
} from "@dabsi/typeorm/relations/tests/TestEntities";
import { DataEntityEvent } from "@dabsi/typedata/data-entity/DataEntitySource";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";

const events: DataEntityEvent[] = [];
beforeAll(async () => {
  const runner = new ModuleRunner();

  const dbm = runner.getInstance(DbModule);
  const dsm = runner.getInstance(DataModule);
  runner.getInstance(TestDbModule);

  addAll(dbm.entityTypes, TestEntities);

  dsm.listen(AEntity, {
    beforeDeleteAll: event => {
      event.select({ pick: ["aText"] });
    },
    beforeUpdateAll: event => {
      event.select({ pick: ["aText"] });
    },
    "*": event => {
      events.push(event);
    },
  });

  await dbm.init();

  const getDataSource = Resolver.resolve(
    DataSourceFactoryResolver,
    runner.context
  );

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
