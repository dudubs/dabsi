import {
  JoinColumn,
  JoinColumnOptions,
  JoinTable,
  JoinTableOptions,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { JoinTableMultipleColumnsOptions } from "typeorm/decorator/options/JoinTableMultipleColumnsOptions";
import { MapFactory } from "../../../common/map/mapFactory";
import { definedAt } from "../../../common/object/definedAt";
import { Type } from "../../../common/typings2/Type";
import { DataRelation } from "../../../typedata/DataRelation";

const targetToRelationKeys = MapFactory(
  (target: Function) => new Set<string>()
);

export function TestRelation<T>(
  getInverseTargetType: () => Type<T>,
  options: {
    joinTable?: JoinTableOptions | JoinTableMultipleColumnsOptions;
    joinColumn?: JoinColumnOptions;
  } = {}
) {
  return <K extends string>(
    target: Partial<Record<K, DataRelation<T> | DataRelation<T>[]>>,
    relationName: K
  ) => {
    const relationInfo = parseRelationName(relationName);

    const inverseRelationName = getInverseRelationName(relationInfo);

    const relationDecorator = definedAt(
      <any>{
        oneToOne: OneToOne,
        manyToMany: ManyToMany,
        manyToOne: ManyToOne,
        oneToMany: OneToMany,
      },
      relationInfo.type
    );

    const ownerDecorator = {
      oneToOne: (...args) => (JoinColumn as any)(options.joinColumn!)(...args),
      manyToMany: (...args) => (JoinTable as any)(options.joinTable!)(...args),
    }[relationInfo.type];

    targetToRelationKeys(target.constructor).add(relationName);

    beforeAll(() => {
      const inverseTargetType = getInverseTargetType();

      assertTargetName(target.constructor.name, relationInfo.fromName);

      assertTargetName(inverseTargetType.name, relationInfo.toName);

      function assertTargetName(targetName: string, name: string) {
        const rootMatch = targetName.match(/^(?<name>.*)(Entity|Base)$/);
        const expectedName: string = rootMatch?.groups?.name ?? targetName;

        if (name !== expectedName) {
          fail(`At ${relationName} expected ${expectedName} in place ${name}`);
        }
      }

      if (!targetToRelationKeys(inverseTargetType).has(inverseRelationName)) {
        console.log(`At ${
          inverseTargetType.name
        }, add: \n @TestRelation(() => ${
          target.constructor.name
        })\n${inverseRelationName}: Relation<${target.constructor.name}>${
          relationInfo.toType === "Many" ? "[]" : ""
        };
`);
      }
    });

    Reflect.decorate(
      [
        ...(ownerDecorator && relationInfo.isOwner ? [ownerDecorator] : []),
        relationDecorator(getInverseTargetType, x => {
          return definedAt(x, inverseRelationName);
        }),
      ],
      target,
      relationName
    );
  };
}

function parseRelationName(name: string) {
  const isOwner = name.endsWith("Owner");

  const [_, fromType, fromName, toType, toName] = name
    .replace(/Owner$/, "")
    .match(/^(one|many)(\w+)To(One|Many)(\w+)$/)!;

  return {
    name,
    fromType,
    fromName,
    toType,
    toName,
    isOwner,
    type: fromType + "To" + toType,
  };
}

function getInverseRelationName(
  relationInfo: ReturnType<typeof parseRelationName>
) {
  const { fromName, fromType, toType, toName, isOwner } = relationInfo;

  const relationType = fromType + "To" + toType;

  const isManyToManyOrOneToOne =
    relationType === "oneToOne" || relationType === "manyToMany";

  if (isOwner && !isManyToManyOrOneToOne)
    throw new Error("ValidateReason property name: " + relationInfo.name);

  if (isManyToManyOrOneToOne) {
    return (
      fromType + toName + "To" + toType + fromName + (isOwner ? "" : "Owner")
    );
  }

  return (
    inverseWords[fromType] + toName + "To" + inverseWords[toType] + fromName
  );
}

const inverseWords = {
  one: "many",
  One: "Many",
  many: "one",
  Many: "One",
  Owner: "",
  "": "Owner",
};

export function forEachTestRelation(
  directions: [string, string][],
  callback: (propertyName: string) => void
) {
  for (let [source, target] of directions) {
    {
      const notOwner = `one${source}ToOne${target}`;
      callback(notOwner);
      callback(notOwner + "Owner");
    }
    {
      const notOwner = `many${source}ToMany${target}`;
      callback(notOwner);
      callback(notOwner + "Owner");
    }
    callback(`one${source}ToMany${target}`);
    callback(`many${source}ToOne${target}`);
  }
}

testm(__filename, () => {
  forEachTestRelation(
    [
      ["A", "B"],
      ["A", "A"],
    ],
    relationName => {
      it(`expect to inverse ${relationName}`, () => {
        const inverseRelationName = getInverseRelationName(
          parseRelationName(relationName)
        );
        expect(relationName).toEqual(
          getInverseRelationName(parseRelationName(inverseRelationName))
        );
      });
    }
  );
});
