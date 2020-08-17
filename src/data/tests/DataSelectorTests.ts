import {DataTypeInfo} from "../DataTypeInfo";
import {DBase, DUnion} from "./BaseEntities";

testm(__filename, () => {
    it('DataSelector', () => {
        expect(DataTypeInfo.get(DUnion).type).toBe(DBase);
    });
})
