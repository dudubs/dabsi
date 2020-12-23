import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import { defined } from "@dabsi/common/object/defined";
import { entries } from "@dabsi/common/object/entries";
import { isEmptyObject } from "@dabsi/common/object/isEmptyObject";
import { mapObject } from "@dabsi/common/object/mapObject";
import { Type } from "@dabsi/common/typings2/Type";
import { subTest } from "@dabsi/jasmine/subTest";
import { getDataEntityInfo } from "@dabsi/typedata/data-entity/DataEntityInfo";
import { DataEntityKey } from "@dabsi/typedata/data-entity/DataEntityKey";
import { DataEntitySource } from "@dabsi/typedata/data-entity/DataEntitySource";
import { buildTestRelations } from "@dabsi/typedata/data-entity/tests/buildTestRelations";
import { DataSelection } from "@dabsi/typedata/data-selection/DataSelection";
import { DataTypeInfo } from "@dabsi/typedata/DataTypeInfo";
import {
  DBase,
  DChild1,
  DChild1Child1,
  DChild2,
  DUnion,
  EBase,
  EChild1,
  EChild1Child1,
  EChild2,
  EUnion,
} from "@dabsi/typedata/tests/BaseEntities";
import { TestConnection } from "@dabsi/typedata/tests/TestConnection";
import {
  AEntity,
  BEntity,
  CEntity,
} from "@dabsi/typeorm/relations/tests/Entities";
import { Connection, DeepPartial, EntityMetadata, ObjectType } from "typeorm";

import objectContaining = jasmine.objectContaining;

const getConnection = TestConnection([
  DBase,
  DChild1,
  DChild2,
  DChild1Child1,
  EBase,
  EChild1,
  EChild2,
  EChild1Child1,

  AEntity,
  BEntity,
  CEntity,
]);

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

it("DataEntityInfo.nonRelationColumnKeys", () => {
  const aBaseInfo = getDataEntityInfo(connection.getMetadata(DBase));
  const dChild1Info = getDataEntityInfo(connection.getMetadata(DChild1));
  const dChild1Child1Info = getDataEntityInfo(
    connection.getMetadata(DChild1Child1)
  );
  const dChild2Info = getDataEntityInfo(connection.getMetadata(DChild2));

  expect(aBaseInfo.nonRelationColumnKeys).toContain("dText");
  expect(dChild1Info.nonRelationColumnKeys).toContain("dText");
  expect(dChild1Child1Info.nonRelationColumnKeys).toContain("dText");
  expect(dChild2Info.nonRelationColumnKeys).toContain("dText");

  expect(aBaseInfo.nonRelationColumnKeys).not.toContain("dChild1Text");
  expect(dChild1Info.nonRelationColumnKeys).toContain("dChild1Text");
  expect(dChild1Child1Info.nonRelationColumnKeys).toContain("dChild1Text");

  expect(aBaseInfo.nonRelationColumnKeys).not.toContain("dChild1Child1Text");
  expect(dChild1Info.nonRelationColumnKeys).not.toContain("dChild1Child1Text");
  expect(dChild1Child1Info.nonRelationColumnKeys).toContain(
    "dChild1Child1Text"
  );

  expect(dChild2Info.nonRelationColumnKeys).toContain("dText");
  expect(dChild2Info.nonRelationColumnKeys).toContain("dChild2Text");
  expect(dChild2Info.nonRelationColumnKeys).not.toContain("dChild1Text");
  expect(dChild2Info.nonRelationColumnKeys).not.toContain("dChild1Child1Text");
});

describe("pick-all and pick-all", () => {
  testUnion({}, tester => {
    tester.testDChild1({
      dId: true,
      dText: true,
      dChild1Text: true,
      dChild1Text2: true,
    });
  });
});

describe("pick-keys and pick-all", () => {
  testUnion({ pick: ["dText"] }, tester => {
    tester.testDChild1({
      dId: false,
      dText: true,
      dChild1Text: false,
      dChild1Text2: false,
    });
  });
});
describe("pick-keys and pick-keys", () => {
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
        // tester.testRow(DChild2, row => {
        //     assertRow(row,
        //         mapObject(ABToManyRelations, () => false)
        //     )
        // })
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

  expect(aInfo.type).toBe(DBase);
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
    metadata = connection.getMetadata(typeInfo.type);

    entityKeyToRow = mapArrayToObject(
      await DataEntitySource.create(type, connection)
        .select(selection)
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
  if (isEmptyObject(expectors)) throw new Error(`expector can't be empty.`);

  for (const [key, expector] of entries(expectors)) {
    subTest(`At key "${key}", `, () => {
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
    });
  }
}
