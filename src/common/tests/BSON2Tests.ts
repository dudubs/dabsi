import {BSON2} from "../BSON2";

it('tryUndefined to array', () => {
    expect(BSON2.unpack(BSON2.pack(["hello"])))
        .toEqual(["hello"])
});
