import { mapArrayToObject } from "@dabsi/common/array/mapArrayToObject";
import waitForSpyCall from "@dabsi/jasmine/waitForSpyCall";
import { DataEntitySource } from "@dabsi/typedata/entity/source";
import { TestConnection } from "@dabsi/typedata/tests/TestConnection";
import { createRpc } from "@dabsi/typerpc2/createRpc";
import {
  DataTable,
  DataTableQuery,
  DataTableQueryResult,
} from "@dabsi/typerpc2/data-table/rpc";
import { DataTableView } from "@dabsi/typerpc2/data-table/view";
import { Rpc, RpcType } from "@dabsi/typerpc2/Rpc";
import { RpcConfigurator } from "@dabsi/typerpc2/RpcConfig";
import ReactTestRenderer from "react-test-renderer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class TestDataEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column()
  xs!: string;
}

const getConnection = TestConnection([TestDataEntity]);

const source = DataEntitySource.createFromConnection(
  TestDataEntity,
  getConnection
);

beforeAll(async () => {
  await source.insertKey({ xs: "hello" });
  await source.insertKey({ xs: "world" });
  await source.insertKey({ xs: "foo" });
});

class dtWithXsColumn extends DataTable({ xs: String }) {}

class dtWithTextColumn extends DataTable({ text: String }) {}

describe("handler", () => {
  const testDataTableQuery = async <T,>(
    rpcType: RpcType<DataTable<T>>,
    config: RpcConfigurator<DataTable<T>>,
    query: DataTableQuery<T> = { pageSize: 1 }
  ): Promise<DataTableQueryResult<T>> => {
    return createRpc(rpcType, config).query(query);
  };

  describe("expect to get column", () => {
    describe("by custom config", () => {
      const expectToLoadedStirng = s =>
        expect(s).toEqual(jasmine.stringMatching(/^loaded /));

      const configWithLoader = { load: data => "loaded " + data } as const;

      describe("with undefined field", () => {
        const config = { source, columns: { xs: {} } };

        it("without loader", () =>
          testDataTableQuery(dtWithXsColumn, $ => $(config)).then(result => {
            expect(result.rows[0].xs).toEqual(jasmine.any(String));
          }));

        it("with loader", () =>
          testDataTableQuery(dtWithXsColumn, $ =>
            $({
              ...config,
              columns: {
                ...config.columns,
                xs: { ...config.columns.xs, ...configWithLoader },
              },
            })
          ).then(result => {
            expect(result.rows[0].xs).toEqual(
              jasmine.stringMatching(/^loaded /)
            );
          }));
      });

      describe("with defined", () => {
        const config = { source, columns: { text: { field: "xs" } } } as const;
        it("without loader", () =>
          testDataTableQuery(dtWithTextColumn, $ => $(config)).then(result => {
            expect(result.rows[0].text).toEqual(jasmine.any(String));
          }));

        it("with loader", () =>
          testDataTableQuery(dtWithTextColumn, $ =>
            $({
              ...config,
              columns: {
                ...config.columns,
                text: { ...config.columns.text, ...configWithLoader },
              },
            })
          ).then(result => {
            expectToLoadedStirng(result.rows[0].text);
          }));
      });
    });

    it("by column loader", () =>
      testDataTableQuery(dtWithXsColumn, $ =>
        $({ source, columns: { xs: () => "loaded!" } })
      ).then(result => {
        expect(result.rows[0].xs).toEqual("loaded!");
      }));

    describe("by undefined config", () => {
      it("with data-field", () =>
        testDataTableQuery(dtWithXsColumn, $ => $({ source })).then(result => {
          expect(result.rows[0].xs).toEqual(jasmine.any(String));
        }));

      it("with selection-field", () =>
        testDataTableQuery(dtWithTextColumn, $ =>
          $({ source: source.addFields({ text: "xs" }) })
        ).then(result => {
          expect(result.rows[0].text).toEqual(jasmine.any(String));
        }));

      it("with non-picked data-field", () =>
        testDataTableQuery(dtWithXsColumn, $ =>
          $({ source: source.pick([]) })
        ).then(result => {
          expect(result.rows[0].xs).toEqual(jasmine.any(String));
        }));
    });
  });
});
describe("view", () => {
  let view: DataTableView<dtWithTextColumn>;

  let querySpy: jasmine.Spy<typeof view["connection"]["query"]>;

  beforeAll(async () => {
    ReactTestRenderer.create(
      <DataTableView
        ref={v => (view = v!)}
        connection={createRpc(dtWithTextColumn, $ =>
          $({
            source,
            isSelectedRow: () => false,
            pageSize: 2,
            columns: { text: { field: "xs" } },
          })
        )}
        searchDebounceMs={0}
      />
    );
    await view.waitForElement();

    querySpy = spyOn(view.connection, "query").and.callThrough();
  });

  it("expect to paging", async () => {
    expect(view.pageSize).toEqual(2);
    expect(view.count).toEqual(3);
    view.pageIndex++;
    await waitForSpyCall(querySpy, ci => ci.args[0].pageIndex === 1);
    expect(view).toEqual(
      jasmine.objectContaining({
        rows: jasmine.objectContaining({ length: 1 }),
        count: 3,
      })
    );
  });

  it("expect to select-all", async () => {
    view.selectAll(true);
    expect(view.getSelectedMap()).toEqual(
      mapArrayToObject(view.rows, row => [row.$key, true])
    );
    expect(view.isSelectedAll).toBeTrue();
    view.selectAll();
    expect(view.getSelectedMap()).toEqual({});
  });

  it("expect to toggle sort.", async () => {
    const expectToggleSortTo = async sort => {
      view.toggleSort("text");
      await expectAsync(
        waitForSpyCall(querySpy, ci => ci.args[0].order?.text?.sort === sort)
      ).toBeResolved();
    };
    await expectToggleSortTo("ASC");
    await expectToggleSortTo("DESC");
    await expectToggleSortTo(undefined);
    await expectToggleSortTo("ASC");
  });

  it("expect to reset page-index on search by text", async () => {
    view.pageIndex = 1;
    view.searchText = "hello";

    expect(
      await (await waitForSpyCall(querySpy, ci => ci.args[0]?.text === "hello"))
        .args[0]
    ).toEqual(
      jasmine.objectContaining({
        pageIndex: 0,
      })
    );
  });
});
