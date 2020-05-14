import "..";
import {DataCursor} from "../../DataCursor";
import objectContaining = jasmine.objectContaining;

const fullName = {$join: [["firstName", "lastName"], " "]};

const cursor = new DataCursor().extend({fullName, isAdult: ["age", {">": 20}]});

it("picking", () => {
    expect(cursor.pick(["email", "fullName"])).toEqual(objectContaining({
        fields: objectContaining({
            email: "email",
            fullName: jasmine.any(Object)
        })
    }));
});

it("omitting", () => {
    expect(cursor.omit(["email", "fullName"])).toEqual(objectContaining({
        fields: objectContaining({
            isAdult: jasmine.any(Object)
        }),
        exclude: new Set([
            "email"
        ])
    }))
})
