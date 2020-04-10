import {BSON} from "./BSON2";

it('sanity', () => {

    expect(BSON.unpack(BSON.pack(["hello"])))
        .toEqual(["hello"])
});
