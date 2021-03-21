import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { defined } from "@dabsi/common/object/defined";
import { entries } from "@dabsi/common/object/entries";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Type } from "@dabsi/common/typings2/Type";
import { DataEntityKey } from "@dabsi/typedata/entity/key";
import { getEntityMetadata } from "@dabsi/typedata/entity/typeormMetadata";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { buildTestRelations } from "@dabsi/typedata/entity/tests/buildTestRelations";
import {
  getTestConnection,
  logTestSqlQueries,
} from "@dabsi/typedata/entity/tests/tester";
import { ASource, BSource } from "@dabsi/typedata/entity/tests/utils";
import { DataSelection } from "@dabsi/typedata/selection/selection";
import { DataSelector } from "@dabsi/typedata/selector";
import {
  DChild1,
  DChild2,
  DEntity,
  DUnion,
  EChild1,
  EChild1Child1,
  EUnion,
} from "@dabsi/typedata/tests/BaseEntities";
import { DataTypeInfo } from "@dabsi/typedata/typeInfo";
import { AEntity } from "@dabsi/typeorm/relations/tests/TestEntities";
import { Connection, DeepPartial, EntityMetadata, ObjectType } from "typeorm";
import { hasKeys } from "../../../common/object/hasKeys";

import objectContaining = jasmine.objectContaining;

const getConnection = getTestConnection;

let connection: Connection;
let dChild1: DChild1;
let dChild2: DChild2;

beforeAll(async () => {
  connection = getConnection();

  [dChild1] = await save(DChild1, [
    {
      dText: "DChild1.text",
      dChild1Text: "DChild1.dChild1Text",
      dChild1Text2: "DChild1.dChild1Text2",
    },
  ]);

  [dChild2] = await save(DChild2, [
    {
      dText: "DChild2.text",
      dChild2Text: "DChild2.dChild1Text",
    },
  ]);

  const [eChild1OfDChild1, eChild1OfDChild2] = await save(EChild1, [
    {
      eText: "EChild1.eText",
      eChild1Text: "EChild1.eChild1Text",
    },
    {
      eText: "EChild1.eText",
      eChild1Text: "EChild1.eChild1Text",
    },
  ]);

  await save(EChild1Child1, [{}]);

  // dChild1 relations
  for (const [d, e] of [
    [dChild1, eChild1OfDChild1],
    [dChild2, eChild1OfDChild2],
  ]) {
    await buildTestRelations(getConnection, d, {
      oneDToOneE: e,
      oneDToOneEOwner: e,
      oneDToManyE: e,
      manyDToOneE: e,
      manyDToManyE: e,
      manyDToManyEOwner: e,
    });
  }
  // dChild1 relations
  await buildTestRelations(getConnection, dChild1, {
    manyDChild1ToOneE: eChild1OfDChild1,
  });

  function save<T>(
    entityType: ObjectType<T>,
    entities: DeepPartial<T>[]
  ): Promise<T[]> {
    const repo = connection.getRepository(entityType);
    return repo.save(entities.map(entity => repo.create(entity)));
  }
});

describe("entity children", () => {
  const test = async (entityType, callback?) => {
    const md = getEntityMetadata(connection, entityType);
    const disValues = [
      md.discriminatorValue,
      ...md.childEntityMetadatas.map(c => c.discriminatorValue),
    ];
    for (const row of await DataEntitySource.createFromConnection(
      entityType,
      getConnection
    ).getRows()) {
      expect(disValues).toContain(row[md.discriminatorColumn!.propertyName]);
      await callback?.(row);
    }
  };

  it("expect to EChild1Child1 entities", () => test(EChild1Child1));
  it("expect to EChild1 entities", () => test(EChild1));
});

describe("pick", () => {
  describe("all and pick all", () => {
    testUnion({}, tester => {
      tester.testDChild1({
        dId: true,
        dText: true,
        dChild1Text: true,
        dChild1Text2: true,
      });
    });
  });

  describe("keys and pick all", () => {
    testUnion({ pick: ["dText"] }, tester => {
      tester.testDChild1({
        dId: false,
        dText: true,
        dChild1Text: false,
        dChild1Text2: false,
      });
    });
  });

  describe("keys and pick keys", () => {
    testUnion(
      {
        pick: ["dText"],
        children: {
          dChild1: { pick: ["dChild1Text"] },
        },
      },
      tester => {
        tester.testDChild1({
          dId: false,
          dText: true,
          dChild1Text: true,
          dChild1Text2: false,
        });
      }
    );
  });
});

describe("relations", () => {
  const DEToOneRelations = {
    // manyDToOneE: true,
    // oneDToOneE: true,
    oneDToOneEOwner: true,
  };

  const EDToOneRelations = {
    manyEToOneD: true,
    oneEToOneD: true,
    oneEToOneDOwner: true,
  };

  // BABToOneRelations
  const EDEToOneRelations = mapObject(EDToOneRelations, () => DEToOneRelations);
  const DEDEToOneRelations = mapObject(
    DEToOneRelations,
    () => EDEToOneRelations
  );
  const DChild1EToOneRelations = {
    manyDChild1ToOneE: true,
  };
  const DChild1EDToOneRelations = mapObject(
    DChild1EToOneRelations,
    () => EDToOneRelations
  );

  describe("D to one _E_E", () => {
    const r = DEDEToOneRelations;

    testUnion(
      {
        relations: mapToSelection(r),
      },
      tester => {
        tester.testDChild1(r);
      }
    );
  });

  describe("DChild1 to one B", () => {
    //

    testUnion(
      {
        children: {
          dChild1: {
            relations: mapToSelection(DChild1EDToOneRelations),
          },
        },
      },
      tester => {
        tester.testDChild1(DChild1EDToOneRelations);
      }
    );
  });

  const ABToManyRelations = {
    oneDToManyE: true,
    manyDToManyE: true,
    manyDToManyEOwner: true,
  };
  const BAToManyRelations = {
    oneEToManyD: true,
    manyEToManyD: true,
    manyEToManyDOwner: true,
  };
  const ABAToManyRelations = mapObject(
    ABToManyRelations,
    () => BAToManyRelations
  );

  describe("A to many B", () => {
    testUnion(
      {
        relations: mapToSelection(ABAToManyRelations),
      },
      tester => {
        tester.testDChild1(ABAToManyRelations);
      }
    );
  });

  describe("DChild1 to many B", () => {
    testUnion(
      {
        children: {
          dChild1: {
            relations: mapToSelection(ABAToManyRelations),
          },
        },
      },
      tester => {
        tester.testDChild1(ABAToManyRelations);
      }
    );
  });

  function mapToSelection(aToB) {
    return mapObject(aToB, value => {
      if (typeof value === "boolean") return value;
      return { relations: mapToSelection(value) };
    });
  }
});

it("DataTypeInfo", () => {
  const aInfo = DataTypeInfo.get(DUnion);
  const bInfo = DataTypeInfo.get(EUnion);

  expect(aInfo.type).toBe(DEntity);
  expect(aInfo.children!.dChild1!).toEqual(
    objectContaining({
      relations: objectContaining({
        oneDToOneE: bInfo,
        manyDChild1ToOneE: bInfo,
      }),
    })
  );
});

function testEntity<T>(
  type: Type<T>,
  selection: DataSelection<T>,
  callback: (tester: { test(row, expected: object): void }) => void
) {
  let entityKeyToRow: Record<string, any> = {};
  let metadata: EntityMetadata;

  beforeAll(async () => {
    const typeInfo = DataTypeInfo.get(type);
    metadata = getEntityMetadata(connection, typeInfo.type);

    entityKeyToRow = mapArrayToObject(
      await DataEntitySource.createFromConnection(<any>type, () => connection)
        .select(<any>selection)
        .getRows(),
      row => [row.$key, row]
    );
  });

  callback({
    test: (getEntity, rowExpector) => {
      const entityKey = DataEntityKey.stringify(metadata, getEntity());
      const row = defined(
        entityKeyToRow[entityKey],
        () => `No entityKey ${entityKey}.`
      );
      expectToRow(row, rowExpector);
    },
  });
}

function testUnion(
  selection: DataSelection<DUnion>,
  callback: (tester: { testDChild1(expector); testDChild2(expector) }) => void
) {
  testEntity(DUnion, selection, tester => {
    callback({
      testDChild1(expector) {
        it("of DChild1", () => {
          tester.test(() => dChild1, expector);
        });
      },
      testDChild2(expector) {
        it("of DChild2", () => {
          tester.test(() => dChild2, expector);
        });
      },
    });
  });
}

function expectToRow(row, expectors) {
  expect(row).toBeTruthy();
  if (!hasKeys(expectors)) throw new Error(`expector can't be empty.`);

  for (const [key, expector] of entries(expectors)) {
    if (!expector) {
      if (row[key] != null) fail(`Expect to be null or undefined`);
      return;
    }

    const value = row[key];

    expect(value).toBeDefined();

    if (/(Text|Id)/.test(key)) {
      expect(value).toBeInstanceOf(String);
      return;
    }

    if (/ToOne/.test(key)) {
      if (expector && typeof expector === "object") {
        expectToRow(value, expector);
      }
      return;
    }

    if (/ToMany/.test(key)) {
      expect(value).toBeInstanceOf(Array);
      if (!value.length) {
        fail(`Expected less one item.`);
        return;
      }
      if (expector && typeof expector === "object") {
        value.forEach(value => {
          expectToRow(value, expector);
        });
      }
      return;
    }

    console.log(`Can't assert ${key}`);
  }
}

describe("DataSelector", () => {
  let key: string;

  class ASelector extends DataSelector(AEntity, {
    relations: { oneAToOneB: true },
  } as const) {}

  const ASelectorSource = DataEntitySource.createFromConnection(
    ASelector,
    getTestConnection
  );

  beforeAll(async () => {
    key = await ASource.insertKey({
      oneAToOneB: await BSource.insertKey({}),
    });
  });

  it("expect to not load relation.", async () => {
    expect((await ASource.get(key))?.oneAToOneB).toBeFalsy();
  });

  it("expect to load relation because source selection.", async () => {
    expect(
      (await ASource.select({ relations: { oneAToOneB: true } }).get(key))
        ?.oneAToOneB
    ).toBeTruthy();
  });

  it("expect to load relation because type selection", async () => {
    expect((await ASelectorSource.get(key))?.oneAToOneB).toBeTruthy();
  });
});
