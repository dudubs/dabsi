import { getDataEntityMetadata } from "@dabsi/typedata/entity/metadata";
import { getEntityMetadata } from "@dabsi/typedata/entity/typeormMetadata";
import { getTestConnection } from "@dabsi/typedata/entity/tests/tester";
import {
  DChild1,
  DChild1Child1,
  DChild2,
  DEntity,
} from "@dabsi/typedata/tests/BaseEntities";

describe("DataEntityMetadata", () => {
  it("notRelationColumnKeys", () => {
    const aBaseInfo = getDataEntityMetadata(
      getEntityMetadata(getTestConnection(), DEntity)
    );
    const dChild1Info = getDataEntityMetadata(
      getEntityMetadata(getTestConnection(), DChild1)
    );
    const dChild1Child1Info = getDataEntityMetadata(
      getEntityMetadata(getTestConnection(), DChild1Child1)
    );
    const dChild2Info = getDataEntityMetadata(
      getEntityMetadata(getTestConnection(), DChild2)
    );

    expect(aBaseInfo.notRelationColumnKeys).toContain("dText");
    expect(dChild1Info.notRelationColumnKeys).toContain("dText");
    expect(dChild1Child1Info.notRelationColumnKeys).toContain("dText");
    expect(dChild2Info.notRelationColumnKeys).toContain("dText");

    expect(aBaseInfo.notRelationColumnKeys).not.toContain("dChild1Text");
    expect(dChild1Info.notRelationColumnKeys).toContain("dChild1Text");
    expect(dChild1Child1Info.notRelationColumnKeys).toContain("dChild1Text");

    expect(aBaseInfo.notRelationColumnKeys).not.toContain("dChild1Child1Text");
    expect(dChild1Info.notRelationColumnKeys).not.toContain(
      "dChild1Child1Text"
    );
    expect(dChild1Child1Info.notRelationColumnKeys).toContain(
      "dChild1Child1Text"
    );

    expect(dChild2Info.notRelationColumnKeys).toContain("dText");
    expect(dChild2Info.notRelationColumnKeys).toContain("dChild2Text");
    expect(dChild2Info.notRelationColumnKeys).not.toContain("dChild1Text");
    expect(dChild2Info.notRelationColumnKeys).not.toContain(
      "dChild1Child1Text"
    );
  });
});
