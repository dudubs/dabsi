import {BSON2} from "@dabsi/common/BSON2";


testm(__filename, () => {

    it('expected to array', () => {
        expect(BSON2.unpack(BSON2.pack(["hello"])))
            .toEqual(["hello"])
    });

});
