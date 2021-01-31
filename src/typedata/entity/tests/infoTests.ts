import { getDataEntityInfo } from "@dabsi/typedata/entity/info";
import { getEntityMetadata } from "@dabsi/typedata/entity/metadata";
import getTestConnection from "@dabsi/typedata/entity/tests/getTestConnection";
import {
  DChild1,
  DChild1Child1,
  DChild2,
  DEntity,
} from "@dabsi/typedata/tests/BaseEntities";

import objectContaining = jasmine.objectContaining;

describe("DataEntityInfo", () => {
  it("notRelationColumnKeys", () => {
    const aBaseInfo = getDataEntityInfo(
      getEntityMetadata(getTestConnection(), DEntity)
    );
    const dChild1Info = getDataEntityInfo(
      getEntityMetadata(getTestConnection(), DChild1)
    );
    const dChild1Child1Info = getDataEntityInfo(
      getEntityMetadata(getTestConnection(), DChild1Child1)
    );
    const dChild2Info = getDataEntityInfo(
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
