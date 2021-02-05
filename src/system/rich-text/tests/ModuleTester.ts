import { Tester } from "@dabsi/jasmine/Tester";
import CliModule from "@dabsi/modules/CliModule";
import DataModule from "@dabsi/modules/data";
import { DataContext } from "@dabsi/modules/data/context";
import { DbModule } from "@dabsi/modules/DbModule";
import TestDbModule from "@dabsi/modules/tests/TestDbModule";
import { RichTextEntity } from "@dabsi/system/rich-text/entities/DocumentEntity";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { findEntities } from "@dabsi/typeorm/findEntities";
import { ChildEntity, Column } from "typeorm";

export default ({ entityTypes = [] as Function[] }) =>
  Tester.beforeAll(async () => {
    const moduleRunner = new ModuleRunner();
    moduleRunner.getInstance(CliModule);
    moduleRunner.getInstance(TestDbModule);
    moduleRunner.getInstance(DataModule);
    const dbModule = moduleRunner.getInstance(DbModule);
    dbModule.entityTypes.addAll(findEntities(entityTypes));
    await dbModule.init();
    const data = moduleRunner.resolve(DataContext);

    return {
      data,
      moduleRunner,
      connection: dbModule.getConnection(),
    };
  });
