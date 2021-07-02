import AsyncProcess from "@dabsi/common/async/AsyncProcess";
import DataForm from "@dabsi/modules/data/common/DataForm";
import DataFormResolver from "@dabsi/modules/data/DataFormResolver";
import { DbQueryRunnerRef } from "@dabsi/modules/DbModule";
import { RpcResolverGenerator } from "@dabsi/modules/rpc/RpcResolverGenerator";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { TestConnection } from "@dabsi/typedata/tests/TestConnection";
import { Resolver, ResolverMap } from "@dabsi/typedi";
import { createRpc } from "@dabsi/typerpc/createRpc";
import { ObjectInput } from "@dabsi/typerpc/object-input/rpc";
import { TextInput } from "@dabsi/typerpc/text-input/rpc";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class TestEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column()
  text!: string;
}

const getConnection = TestConnection([TestEntity]);
const testSource = DataEntitySource.createFromConnection(
  TestEntity,
  getConnection
);

beforeAll(async () => {
  await testSource.remove();
});

let rb: RpcResolverGenerator;
let context: ResolverMap;

const dft = DataForm(
  ObjectInput({
    msg: TextInput,
  })
);

beforeEach(() => {
  rb = new RpcResolverGenerator();
  context = Resolver.Context.assign(
    {},
    [rb, new AsyncProcess()],
    Resolver(DbQueryRunnerRef, () => () => getConnection().createQueryRunner())
  );
  rb.add(
    DataFormResolver(dft, TestEntity, {}, c => $ =>
      $({
        commitConfig: ($, v) => {
          // @ts-expect-error
          v.foo;
          return $({
            text: v.msg,
          });
        },
      })
    )
  );
});

const test = async () => {
  const dfc = Resolver.resolve(rb.getResolver(dft), context);
  const df = createRpc(dft, dfc);
  const { value } = <{ value }>await df.submit({ msg: "hello" });
  return await testSource.filter({ $is: value }).pick(["text"]).getOrFail();
};

it("expect to insert", async () => {
  expect(await test()).toBeDefined();
});
