import DataSystemModule from "@dabsi/system/core/DataSystemModule";
import { DbModule } from "@dabsi/system/core/DbModule";
import DataSystemSource from "@dabsi/system/core/SystemDataSource";
import ImageStorageModule from "@dabsi/system/storage/image";
import DataSources from "@dabsi/typedata/DataSources";
import { Inject, Module } from "@dabsi/typedi";
import { ModuleRunner } from "@dabsi/typedi/ModuleRunner";
import { ObjectResolver } from "@dabsi/typedi/resolvers/ObjectResolver";
import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DataRelation } from "./../../../typedata/DataRelation";
import { Resolver, ResolverType } from "./../../../typedi/Resolver";
import { Image } from "./entities/Image";

@Entity({
  name: "test/image",
})
class TestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Image)
  oneImage: DataRelation<Image>;

  @ManyToMany(() => Image)
  manyImages: DataRelation<Image>[];
}

@Module({})
class TestModule {
  constructor(
    @Inject() public dbm: DbModule,
    @Inject() public dsm: DataSystemModule,
    @Inject() public ism: ImageStorageModule
  ) {
    dbm.entityTypes.add(TestEntity);
  }
}

const testResolver = ObjectResolver({
  sources: DataSources({
    testEntities: TestEntity,
  }),
});

let t: ResolverType<typeof testResolver>;

beforeAll(async () => {
  const runner = new ModuleRunner();
  const tm = runner.getModuleInstance(TestModule);
  await tm.dbm.init();

  t = Resolver.checkAndResolve(testResolver, runner.context);
});

fit("expect to DataSystemSource", async () => {
  expect(t.sources.testEntities).toBeInstanceOf(DataSystemSource);
});

fit("", async () => {});
