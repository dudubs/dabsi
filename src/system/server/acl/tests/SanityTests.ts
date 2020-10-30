import { EntityDataSource } from "../../../../typedata/entity-data/EntityDataSource";
import { TestConnection } from "../../../../typedata/tests/TestConnection";
import { Group } from "../Group";
import { User } from "../User";

testm(__filename, () => {
  const getConnection = TestConnection([User, Group]);

  const Users = EntityDataSource.create(User, {
    connection: getConnection,
  });
  const Groups = EntityDataSource.create(Group, {
    connection: getConnection,
  });

  let g1: string;
  let g2: string;
  let u1: string;
  let u2: string;
  let u3: string;

  let gi = 0;

  beforeAll(async () => {
    [g1, g2] = [
      await Groups.insertKey({ name: `g${gi++}` }),
      await Groups.insertKey({ name: `g${gi++}` }),
    ];
    [u1, u2, u3] = [
      await Users.insertKey({}),
      await Users.insertKey({}),
      await Users.insertKey({}),
    ];

    await Groups.at("users", g1).add([u1, u2]);
    items = (
      await Groups.addFields({
        u1InGroup: { $has: { users: { $is: u1 } } },
        u2InGroup: { $has: { users: { $is: u2 } } },
        u3InGroup: { $has: { users: { $is: u3 } } },
      }).getRows()
    ).map(item => ({
      ...item,
      u1InGroup: !!item.u1InGroup,
      u2InGroup: !!item.u2InGroup,
      u3InGroup: !!item.u3InGroup,
    }));
  });

  let items: any[];

  it("$is", async () => {
    const result = await Users.filter({ $is: [u1, u2] }).getRows();
    expect(result).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ $key: u1 }),
        jasmine.objectContaining({ $key: u2 }),
      ])
    );

    expect(result).not.toEqual(
      jasmine.objectContaining(
        jasmine.arrayContaining([jasmine.objectContaining({ $key: u3 })])
      )
    );
  });

  function assert(g: string, u: "u1" | "u2" | "u3", exists: boolean) {
    expect(items).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({
          $key: g,
          ...{
            [u + "InGroup"]: exists,
          },
        }),
      ])
    );
  }

  it("expected u1 in g1", () => assert(g1, "u1", true));

  it("expected u2 in g1", () => assert(g1, "u2", true));

  it("expected u3 not in g1", () => assert(g1, "u3", false));

  it("expected u2 not in g2", () => assert(g2, "u2", false));

  it("expected u3 not in g2", () => assert(g2, "u3", false));
});
