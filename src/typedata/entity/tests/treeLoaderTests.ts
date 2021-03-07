import { entries } from "@dabsi/common/object/entries";
import expectString from "@dabsi/jasmine/expectString";
import { Tester } from "@dabsi/jasmine/Tester";
import { inspect } from "@dabsi/logging/inspect";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { ASource } from "@dabsi/typedata/entity/tests/utils";
import { DataEntityTreeLoader } from "@dabsi/typedata/entity/treeLoader";
const treeTypeMap = {
  childToParent: "oneAToOneAOwner",
  parentToChild: "oneAToOneA",

  parentToChildren: "oneAToManyA",
  childrenToParent: "manyAToOneA", // Owner

  parentsToChildren: "manyAToManyA",
  childrenToParents: "manyAToManyAOwner",
} as const;
beforeAll(async () => {
  const savedEntityKeys = new Set<string>();
  const oneToOnePaernts = new Set<string>();
  const save = async (id: string) => {
    if (!id || !savedEntityKeys.touch(id)) return id;
    const parentId = id.substr(0, id.lastIndexOf("_"));
    await save(parentId);

    const a = await ASource.insert({
      aId: id,
      [treeTypeMap.childrenToParent]: parentId || null,
    });

    if (parentId) {
      await a.at(treeTypeMap.childrenToParents).add(parentId);
      if (oneToOnePaernts.touch(parentId)) {
        await a.at(treeTypeMap.childToParent).add(parentId);
      }
    }

    return id;
  };

  const i = [1, 2];
  await save("a3");
  for (const a of i) {
    for (const b of i) {
      for (const c of i) {
        for (const d of i) {
          for (const e of i) {
            for (const f of i) {
              await save(`a${[a, b, c, d, e, f].join("_")}`);
            }
          }
        }
      }
    }
  }
});

describe("DataEntityTreeLoader", () => {
  // focusNextTest();

  for (const [treeType, relationPropertyName] of entries(treeTypeMap)) {
    const isOwner = treeType.startsWith("child");

    describe(`${treeType}<${relationPropertyName}>`, () => {
      const t = Tester.beforeAll(() => {
        return {
          loader: new DataEntityTreeLoader(
            ((ASource.filter({
              $is: ["a1_1_1", "a2_1_2"],
            }) as any) as DataEntitySource<any>).entityLoader,
            relationPropertyName
          ),
        };
      });
      it(`expect rootKeys will be ${
        isOwner ? "selected-keys" : "relation-keys"
      }`, async () => {
        const rootKeys = await t.loader.loadRootKeys();
        expect(rootKeys.length).toBeGreaterThan(0);
        for (const rootKey of rootKeys) {
          expect(rootKey).toMatch(
            isOwner ? /^a(1_1_1|2_1_2)$/ : /^a(1_1_1|2_1_2)_/
          );
        }
      });
      for (const inverse of [false, true]) {
        it(`expect tree-rows will be ${
          inverse ? "parent->child" : "child->parent"
        }`, async () => {
          const rows = await t.loader.loadTreeRows({ inverse });
          // console.log(inspect({ rows }));
          let maxDepth = 0;

          for (const root of rows) {
            expect(root.$key).toMatch(
              isOwner ? /^a(1_1_1|2_1_2)$/ : /^a(1_1_1|2_1_2)_/
            );
          }

          forEachRecursive(rows, row => {
            maxDepth = Math.max(maxDepth, row.$depth);
            if (row.$parent) {
              const [parent, child] = inverse
                ? [row, row.$parent]
                : [row.$parent, row];
              expectString(child.$key, { startsWith: parent.$key + "_" });
            }
            return row.$children;
          });

          // console.log({ maxDepth, inverse, relationPropertyName });
          expect(maxDepth).toBeGreaterThan(1);
        });
      }
    });
  }
});

function forEachRecursive<T>(
  rows: Iterable<T>,
  callback: (row: T, ...parents: T[]) => Iterable<T>
) {
  for (const row of rows) {
    forEachRecursive(callback(row), callback);
  }
}
