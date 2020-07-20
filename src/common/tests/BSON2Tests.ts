import {BSON2} from "../BSON2";


testm(__filename, () => {

    it('expected to array', () => {
        expect(BSON2.unpack(BSON2.pack(["hello"])))
            .toEqual(["hello"])
    });

});
